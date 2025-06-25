import { handlers as userHandlers } from './users'
import { handlers as contestHandlers } from './contests'
import { handlers as groupeHandlers } from './groups'
import { handlers as projectHandlers } from './projects'
import { setupWorker } from 'msw/browser'

const handlers = [
  ...userHandlers,
  ...contestHandlers,
  ...groupeHandlers,
  ...projectHandlers
]

export const initMock = async () => {
  if (import.meta.env.DEV) {
    const server = setupWorker(...handlers)
    await server.start({ onUnhandledRequest: 'bypass' })
  }
}
