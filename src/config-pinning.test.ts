import { test, describe, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')

// ---- helpers ----

function readFile(rel: string): string {
  return readFileSync(resolve(root, rel), 'utf-8')
}

/** Extract all `uses:` action references from a workflow YAML string. */
function extractActionUses(yaml: string): string[] {
  const matches = yaml.matchAll(/uses:\s+(\S+)/g)
  return Array.from(matches, m => m[1]).filter(
    (ref): ref is string => Boolean(ref)
  )
}

/** Return true when an action reference is pinned to a full 40-char SHA. */
function isShaPinned(ref: string): boolean {
  // Format: owner/action@<40-hex-chars>  (optionally followed by " # <tag>")
  return /^[^@]+@[0-9a-f]{40}$/i.test(ref)
}

/** Return true when a version string has no leading range specifier (^ or ~). */
function isExactVersion(version: string): boolean {
  return !/^[\^~]/.test(version)
}

// ---- package.json ----

describe('package.json', () => {
  const pkg = JSON.parse(readFile('package.json')) as {
    dependencies?: Record<string, string>
    devDependencies?: Record<string, string>
    engines?: Record<string, string>
  }

  test('all runtime dependencies use exact versions (no ^ or ~)', () => {
    const deps = pkg.dependencies ?? {}
    for (const [name, version] of Object.entries(deps)) {
      expect(
        isExactVersion(version),
        `dependency "${name}" has range specifier: "${version}"`
      ).toBe(true)
    }
  })

  test('all devDependencies use exact versions (no ^ or ~)', () => {
    const devDeps = pkg.devDependencies ?? {}
    for (const [name, version] of Object.entries(devDeps)) {
      expect(
        isExactVersion(version),
        `devDependency "${name}" has range specifier: "${version}"`
      ).toBe(true)
    }
  })

  test('node engine minimum version does not use a caret range', () => {
    const nodeEngine = pkg.engines?.node
    expect(nodeEngine).toBeTruthy()
    // The minimum version part (before "||") must not start with ^
    const [minPartRaw = ''] = (nodeEngine ?? '').split('||')
    const minPart = minPartRaw.trim()
    expect(
      isExactVersion(minPart),
      `node engine "${nodeEngine}" has caret range on minimum version`
    ).toBe(true)
  })

  test('node engine constraint matches the expected pinned value', () => {
    expect(pkg.engines?.node).toBe('20.19.0 || >=22.12.0')
  })

  // Regression: ensure none of the known previously-caret packages sneaked back
  test('key runtime dependencies are pinned to their expected exact versions', () => {
    expect(pkg.dependencies?.vue).toBe('3.5.33')
    expect(pkg.dependencies?.axios).toBe('1.13.6')
    expect(pkg.dependencies?.pinia).toBe('3.0.4')
    expect(pkg.dependencies?.['vue-router']).toBe('5.0.6')
  })

  test('key devDependencies are pinned to their expected exact versions', () => {
    expect(pkg.devDependencies?.typescript).toBe('6.0.3')
    expect(pkg.devDependencies?.vitest).toBe('4.1.5')
    expect(pkg.devDependencies?.vite).toBe('8.0.10')
  })
})

// ---- Dockerfile ----

describe('Dockerfile', () => {
  const dockerfile = readFile('Dockerfile')

  /** Extract all base image references from FROM instructions. */
  function extractFromImages(content: string): string[] {
    const matches = content.matchAll(/^FROM\s+(?:--\S+\s+)?(\S+)/gim)
    return Array.from(matches, m => m[1]).filter(
      (image): image is string => Boolean(image)
    )
  }

  function hasShaSuffix(image: string): boolean {
    return /@sha256:[0-9a-f]{64}$/i.test(image)
  }

  test('build stage base image is pinned with a SHA256 digest', () => {
    const images = extractFromImages(dockerfile)
    expect(images.length).toBeGreaterThanOrEqual(1)
    const buildImage = images[0]
    if (!buildImage) {
      throw new Error('Build stage image is missing')
    }
    expect(
      hasShaSuffix(buildImage),
      `Build stage image "${buildImage}" is not SHA-pinned`
    ).toBe(true)
  })

  test('production stage base image is pinned with a SHA256 digest', () => {
    const images = extractFromImages(dockerfile)
    expect(images.length).toBeGreaterThanOrEqual(2)
    const prodImage = images[1]
    if (!prodImage) {
      throw new Error('Production stage image is missing')
    }
    expect(
      hasShaSuffix(prodImage),
      `Production stage image "${prodImage}" is not SHA-pinned`
    ).toBe(true)
  })

  test('every FROM instruction uses a SHA256-pinned image', () => {
    const images = extractFromImages(dockerfile)
    expect(images.length).toBeGreaterThan(0)
    for (const image of images) {
      expect(
        hasShaSuffix(image),
        `Image "${image}" in FROM instruction is not SHA-pinned`
      ).toBe(true)
    }
  })

  test('build stage uses the expected node alpine image with correct SHA', () => {
    expect(dockerfile).toContain(
      'node:22.12.0-alpine@sha256:51eff88af6dff26f59316b6e356188ffa2c422bd3c3b76f2556a2e7e89d080bd'
    )
  })

  test('production stage uses the expected caddy alpine image with correct SHA', () => {
    expect(dockerfile).toContain(
      'caddy:2.4.6-alpine@sha256:15e576e7d00b1f41a648c5295a03677c24da5fede09131edcb1e6d809c7dc8aa'
    )
  })

  // Regression: plain mutable tags without SHA must not appear in FROM lines
  test('no FROM instruction references an image without a SHA digest', () => {
    const images = extractFromImages(dockerfile)
    const unpinned = images.filter(img => !hasShaSuffix(img))
    expect(unpinned).toHaveLength(0)
  })
})

// ---- GitHub Actions workflows ----

describe('GitHub Actions workflows use SHA-pinned actions', () => {
  const workflowFiles = [
    '.github/workflows/PR-Agent.yaml',
    '.github/workflows/auto-merge.yaml',
    '.github/workflows/main.yml',
    '.github/workflows/release.yaml',
    '.github/workflows/staging.yml'
  ]

  for (const file of workflowFiles) {
    describe(file, () => {
      const yaml = readFile(file)
      const refs = extractActionUses(yaml)

      test('contains at least one action reference', () => {
        expect(refs.length).toBeGreaterThan(0)
      })

      test('every action reference is pinned to a 40-character commit SHA', () => {
        for (const ref of refs) {
          expect(
            isShaPinned(ref),
            `Action "${ref}" in ${file} is not pinned to a full commit SHA`
          ).toBe(true)
        }
      })

      test('no action reference uses a mutable tag without a SHA', () => {
        const mutableRefs = refs.filter(r => /@v\d/.test(r) && !isShaPinned(r))
        expect(
          mutableRefs,
          `Mutable version tags found in ${file}: ${mutableRefs.join(', ')}`
        ).toHaveLength(0)
      })
    })
  }

  // Per-workflow regression tests for specific expected SHAs

  describe('PR-Agent.yaml specific pins', () => {
    const yaml = readFile('.github/workflows/PR-Agent.yaml')
    test('qodo-ai/pr-agent is pinned to the expected SHA', () => {
      expect(yaml).toContain(
        'qodo-ai/pr-agent@d82f7d3e696cd00822694aaa3096265d3889f3f1'
      )
    })
  })

  describe('auto-merge.yaml specific pins', () => {
    const yaml = readFile('.github/workflows/auto-merge.yaml')
    test('dependabot/fetch-metadata is pinned to the expected SHA', () => {
      expect(yaml).toContain(
        'dependabot/fetch-metadata@25dd0e34f4fe68f24cc83900b1fe3fe149efef98'
      )
    })
  })

  describe('main.yml specific pins', () => {
    const yaml = readFile('.github/workflows/main.yml')
    test('actions/checkout is pinned to the expected SHA', () => {
      expect(yaml).toContain(
        'actions/checkout@de0fac2e4500dabe0009e67214ff5f5447ce83dd'
      )
    })
    test('actions/setup-node is pinned to the expected SHA', () => {
      expect(yaml).toContain(
        'actions/setup-node@48b55a011bda9f5d6aeb4c2d9c7362e8dae4041e'
      )
    })
    test('actions/upload-artifact is pinned to the expected SHA', () => {
      expect(yaml).toContain(
        'actions/upload-artifact@043fb46d1a93c77aae656e7c1c64a875d1fc6a0a'
      )
    })
    test('actions/download-artifact is pinned to the expected SHA', () => {
      expect(yaml).toContain(
        'actions/download-artifact@3e5f45b2cfb9172054b4087a40e8e0b5a5461e7c'
      )
    })
  })

  describe('release.yaml specific pins', () => {
    const yaml = readFile('.github/workflows/release.yaml')
    test('softprops/action-gh-release is pinned to the expected SHA', () => {
      expect(yaml).toContain(
        'softprops/action-gh-release@b4309332981a82ec1c5618f44dd2e27cc8bfbfda'
      )
    })
    test('docker/setup-qemu-action is pinned to the expected SHA', () => {
      expect(yaml).toContain(
        'docker/setup-qemu-action@ce360397dd3f832beb865e1373c09c0e9f86d70a'
      )
    })
    test('docker/setup-buildx-action is pinned to the expected SHA', () => {
      expect(yaml).toContain(
        'docker/setup-buildx-action@4d04d5d9486b7bd6fa91e7baf45bbb4f8b9deedd'
      )
    })
    test('docker/login-action is pinned to the expected SHA', () => {
      expect(yaml).toContain(
        'docker/login-action@4907a6ddec9925e35a0a9e82d7399ccc52663121'
      )
    })
    test('docker/build-push-action is pinned to the expected SHA', () => {
      expect(yaml).toContain(
        'docker/build-push-action@f9f3042f7e2789586610d6e8b85c8f03e5195baf'
      )
    })
  })

  describe('staging.yml specific pins', () => {
    const yaml = readFile('.github/workflows/staging.yml')
    test('docker/login-action is pinned to the expected SHA', () => {
      expect(yaml).toContain(
        'docker/login-action@4907a6ddec9925e35a0a9e82d7399ccc52663121'
      )
    })
    test('docker/build-push-action is pinned to the expected SHA', () => {
      expect(yaml).toContain(
        'docker/build-push-action@f9f3042f7e2789586610d6e8b85c8f03e5195baf'
      )
    })
    test('shimataro/ssh-key-action is pinned to the expected SHA', () => {
      expect(yaml).toContain(
        'shimataro/ssh-key-action@87a8f067114a8ce263df83e9ed5c849953548bc3'
      )
    })
  })
})
