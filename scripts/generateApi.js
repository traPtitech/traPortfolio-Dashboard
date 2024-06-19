/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
import fs from 'fs/promises'
import path from 'path'
import { exec } from 'child_process'
import { promisify } from 'util'
import { addApis } from './addApis.js'

const __dirname = import.meta.dirname

const execPromise = promisify(exec)

const SWAGGER_PATH =
  'https://raw.githubusercontent.com/traPtitech/traPortfolio/main/docs/swagger/traPortfolio.v1.yaml'
const GENERATED_DIR = 'src/lib/apis/generated'

const generateCmd = [
  'docker run --rm -v "${PWD}:/local" -u $(id -u) openapitools/openapi-generator-cli:v7.5.0',
  'generate',
  '-g',
  'typescript-axios',
  '-i',
  SWAGGER_PATH,
  '-o',
  '/local/src/lib/apis/generated'
]

if (process.env.SKIP_GENAPI) {
  // eslint-disable-next-line no-console
  console.log('Skipped generating apis.')
}

;(async () => {
  await fs.mkdir(path.resolve(__dirname, '../', GENERATED_DIR), {
    recursive: true
  })

  await execPromise(generateCmd.join(' '))

  // generate Apis class
  await addApis(GENERATED_DIR)
})()
