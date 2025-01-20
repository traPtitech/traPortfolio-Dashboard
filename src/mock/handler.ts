import { handlers as userHandlers } from '/@/mock/users'
import { handlers as contestHandlers } from '/@/mock/contests'
import { handlers as groupeHandlers } from '/@/mock/groups'
import { handlers as projectHandlers } from '/@/mock/projects'

export const makeRelativeUrl = (url: string) => {
  return `/api/v1${url}`
}

export const handlers = [
  ...userHandlers,
  ...contestHandlers,
  ...groupeHandlers,
  ...projectHandlers
]
