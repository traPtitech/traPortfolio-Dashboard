import { http, HttpResponse } from 'msw'
import { Group, GroupDetail } from '../lib/apis'
import { sampleUsers } from './users'

const sampleGroupDetail: GroupDetail = {
  id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
  name: 'サンプル班1 -sample group 1-',
  link: 'https://example.com',
  description: 'Sample description for group 1',
  admin: sampleUsers,
  members: sampleUsers.map(user => {
    return {
      id: user.id,
      name: user.name,
      realName: user.realName,
      description: '',
      duration: {
        since: { year: 2015, semester: 0 },
        until: { year: 2021, semester: 1 }
      }
    }
  })
}

const sampleGroup: Group = {
  id: sampleGroupDetail.id,
  name: sampleGroupDetail.name
}

export const handlers = [
  // apis.getProjects
  http.get<never, never, Group[]>('/api/v1/groups', () => {
    return HttpResponse.json(Array(10).fill(sampleGroup))
  }),

  // apis.getProject
  http.get<{ groupId: string }, never, GroupDetail>(
    '/api/v1/groups/:groupId',
    () => {
      return HttpResponse.json(sampleGroupDetail)
    }
  ),

  // apis.getUserGroups
  http.get<{ userId: string }, never, Group[]>(
    '/api/v1/users/:userId/groups',
    () => {
      return HttpResponse.json(Array(10).fill(sampleGroup))
    }
  )
]
