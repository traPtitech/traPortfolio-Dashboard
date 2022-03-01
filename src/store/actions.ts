import { defineActions } from 'direct-vuex'
import { rootActionContext } from '.'
import apis, { Group, Event, Project, Contest } from '/@/lib/apis'

export const actions = defineActions({
  async fetchGroups(context): Promise<Group[]> {
    const { state, commit } = rootActionContext(context)

    if (state.groups !== null) {
      return state.groups
    }

    const res = await apis.getGroups()
    commit.setGroups(res.data)
    return res.data
  },
  async fetchEvents(context): Promise<Event[]> {
    const { state, commit } = rootActionContext(context)

    if (state.events !== null) {
      return state.events
    }

    const res = await apis.getEvents()
    commit.setEvents(res.data)
    return res.data
  },
  async fetchProjects(context): Promise<Project[]> {
    const { state, commit } = rootActionContext(context)

    if (state.projects !== null) {
      return state.projects
    }

    const res = await apis.getProjects()
    commit.setProjects(res.data)
    return res.data
  },
  async fetchContests(context): Promise<Contest[]> {
    const { state, commit } = rootActionContext(context)

    if (state.contests !== null) {
      return state.contests
    }

    const res = await apis.getContests()
    commit.setContests(res.data)
    return res.data
  }
})
