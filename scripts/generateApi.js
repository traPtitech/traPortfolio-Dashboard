/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const fs = require('fs/promises')
const path = require('path')
const { exec } = require('child_process')
const { promisify } = require('util')
const execPromise = promisify(exec)
const addApis = require('./addApis')

const SWAGGER_PATH = 'https://raw.githubusercontent.com/traPtitech/traPortfolio/main/docs/swagger/traPortfolio.v1.yaml'
const GENERATED_DIR = 'src/lib/apis/generated'

const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx'

const generateCmd = [
  npx,
  'openapi-generator-cli',
  'generate',
  '-g',
  'typescript-axios',
  '-i',
  SWAGGER_PATH,
  '-o',
  GENERATED_DIR
]

if (process.env.SKIP_GENAPI) {
  // eslint-disable-next-line no-console
  console.log('Skipped generating apis.')
  return
}

;(async () => {
  await fs.mkdir(path.resolve(__dirname, '../', GENERATED_DIR), {
    recursive: true
  })

  await execPromise(generateCmd.join(' '))

  // generate Apis class
  await addApis(GENERATED_DIR)
})()
