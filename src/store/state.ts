import { Group, Event, Project, Contest } from '/@/lib/apis'

export interface S {
  groups: Group[] | null
  events: Event[] | null
  projects: Project[] | null
  contests: Contest[] | null
}

export const state: S = {
  groups: null,
  events: null,
  projects: null,
  contests: null
}
