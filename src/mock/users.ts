import { http, HttpResponse } from 'msw'
import {
  Contest,
  Project,
  User,
  UserAccountState,
  UserDetail
} from '../lib/apis'

const users: UserDetail[] = [
  {
    id: '00000000-0000-0000-0000-000000000000',
    name: 'sampleActiveUser0',
    realName: 'Sam Ple10',
    accounts: [],
    bio: '',
    state: UserAccountState.active
  },
  {
    id: '00000000-0000-0000-0000-000000000001',
    name: 'sampleActiveUser1',
    realName: 'Sam Ple11',
    accounts: [],
    bio: '',
    state: UserAccountState.active
  },
  {
    id: '00000000-0000-0000-0000-000000000002',
    name: 'sampleActiveUser2',
    realName: 'Sam Ple12',
    accounts: [],
    bio: '',
    state: UserAccountState.active
  },
  {
    id: '00000000-0000-0000-0000-000000000003',
    name: 'sampleActiveUser3',
    realName: 'Sam Ple13',
    accounts: [],
    bio: '',
    state: UserAccountState.active
  },
  {
    id: '00000000-0000-0000-0001-000000000000',
    name: 'sampleDeactivatedUser0',
    realName: 'Sam Ple00',
    accounts: [],
    bio: '',
    state: UserAccountState.deactivated
  },
  {
    id: '00000000-0000-0000-0001-000000000001',
    name: 'sampleDeactivatedUser1',
    realName: 'Sam Ple01',
    accounts: [],
    bio: '',
    state: UserAccountState.deactivated
  },
  {
    id: '00000000-0000-0000-0001-000000000002',
    name: 'sampleDeactivatedUser2',
    realName: 'Sam Ple02',
    accounts: [],
    bio: '',
    state: UserAccountState.deactivated
  },
  {
    id: '00000000-0000-0000-0001-000000000003',
    name: 'sampleDeactivatedUser3',
    realName: 'Sam Ple03',
    accounts: [],
    bio: '',
    state: UserAccountState.deactivated
  },
  {
    id: '00000000-0000-0000-0002-000000000000',
    name: 'sampleSuspendedUser0',
    realName: 'Sam Ple20',
    accounts: [],
    bio: '',
    state: UserAccountState.suspended
  },
  {
    id: '00000000-0000-0000-0002-000000000001',
    name: 'sampleSuspendedUser1',
    realName: 'Sam Ple21',
    accounts: [],
    bio: '',
    state: UserAccountState.suspended
  },
  {
    id: '00000000-0000-0000-0002-000000000002',
    name: 'sampleSuspendedUser2',
    realName: 'Sam Ple22',
    accounts: [],
    bio: '',
    state: UserAccountState.suspended
  },
  {
    id: '00000000-0000-0000-0002-000000000003',
    name: 'sampleSuspendedUser3',
    realName: 'Sam Ple23',
    accounts: [],
    bio: '',
    state: UserAccountState.suspended
  }
]

export const handlers = [
  // apis.getUsers
  http.get<
    { includeSuspended?: string; name?: string; limit?: string },
    never,
    User[],
    '/api/v1/users'
  >('/api/v1/users', ({ params }) => {
    if (params.includeSuspended === 'true') {
      return HttpResponse.json(
        users
          .filter(user => user.state === UserAccountState.active)
          .map(user => ({
            id: user.id,
            name: user.name,
            realName: user.realName
          }))
      )
    }

    if (params.name) {
      return HttpResponse.json(
        users
          .filter(user => user.name === params.name)
          .map(user => ({
            id: user.id,
            name: user.name,
            realName: user.realName
          }))
      )
    }

    if (params.limit) {
      return HttpResponse.json(
        users.slice(0, parseInt(params.limit)).map(user => ({
          id: user.id,
          name: user.name,
          realName: user.realName
        }))
      )
    }

    return HttpResponse.json(
      users.map(user => ({
        id: user.id,
        name: user.name,
        realName: user.realName
      }))
    )
  }),

  // apis.getUser
  http.get<{ userId: string }, never, UserDetail, '/api/v1/users/:userId'>(
    '/api/v1/users/:userId',
    ({ params }) => {
      return HttpResponse.json(users.find(user => user.id === params.userId))
    }
  ),

  // apis.getUserProjects
  http.get<
    { userId: string },
    never,
    Project[],
    '/api/v1/users/:userId/projects'
  >('/api/v1/users/:userId/projects', ({ params }) => {
    if (params.userId === 'true') {
      return HttpResponse.json([
        {
          id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
          name: 'sampleProject',
          duration: {
            since: { year: 2021, semester: 1 },
            until: { year: 2021, semester: 1 }
          }
        }
      ])
    }
    return HttpResponse.json([
      {
        id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        name: 'sampleProject',
        duration: {
          since: { year: 2021, semester: 1 },
          until: { year: 2021, semester: 1 }
        }
      }
    ])
  }),

  // apis.getUserContests
  http.get<
    { userId: string },
    never,
    Contest[],
    '/api/v1/users/:userId/contests'
  >('/api/v1/users/:userId/contests', ({ params }) => {
    if (params.userId === 'true') {
      return HttpResponse.json([
        {
          id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
          name: 'sampleContest',
          duration: {
            since: '2021-01-01T00:00:00Z',
            until: '2021-01-01T00:00:00Z'
          }
        }
      ])
    }
    return HttpResponse.json([
      {
        id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        name: 'sampleContest',
        duration: {
          since: '2021-01-01T00:00:00Z',
          until: '2021-01-01T00:00:00Z'
        }
      }
    ])
  }),

  // apis.getUserGroups
  http.get<{ userId: string }, never, User[], '/api/v1/users/:userId/groups'>(
    '/api/v1/users/:userId/groups',
    ({ params }) => {
      if (params.userId === 'true') {
        return HttpResponse.json([
          {
            id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
            name: 'sampleGroup',
            realName: 'Sam Ple'
          }
        ])
      }
      return HttpResponse.json([{ id: '', name: 'Alice', realName: '' }])
    }
  )
]