import { handlers as userHandlers } from './users'
import { handlers as contestHandlers } from './contests'
import { handlers as groupeHandlers } from './groups'
import { handlers as projectHandlers } from './projects'

export const handlers = [
  ...userHandlers,
  ...contestHandlers,
  ...groupeHandlers,
  ...projectHandlers
]
