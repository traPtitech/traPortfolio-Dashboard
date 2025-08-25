import { handlers as userHandlers } from './users'
import { handlers as contestHandlers } from './contests'
import { handlers as groupHandlers } from './groups'
import { handlers as projectHandlers } from './projects'
import { setupWorker } from 'msw/browser'

const handlers = [
  ...userHandlers,
  ...contestHandlers,
  ...groupHandlers,
  ...projectHandlers
]

export const worker = setupWorker(...handlers)
