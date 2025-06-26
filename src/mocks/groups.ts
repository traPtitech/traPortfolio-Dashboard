import { http, HttpResponse } from 'msw'
import { Group, GroupDetail, User } from '/@/lib/apis'

export const handlers = [
  // apis.getProjects
  http.get<never, never, Group[], '/api/v1/groups'>('/api/v1/groups', () => {
    return HttpResponse.json([
      {
        id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        name: 'sampleGroup'
      }
    ])
  }),

  // apis.getProject
  http.get<{ groupId: string }, never, GroupDetail, '/api/v1/groups/:groupId'>(
    '/api/v1/groups/:groupId',
    () => {
      return HttpResponse.json({
        id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        name: 'sampleGroup',
        description: 'sampleGroup',
        link: '',
        admin: [],
        members: []
      })
    }
  ),

  // apis.getUserGroups
  http.get<{ userId: string }, never, User[], '/api/v1/users/:userId/groups'>(
    '/api/v1/users/:userId/groups',
    ({ params }) => {
      if (params.userId === 'true') {
        return HttpResponse.json([
          {
            id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
            name: 'sampleUser',
            realName: 'Sam Ple'
          }
        ])
      }
      return HttpResponse.json([{ id: '', name: 'Alice', realName: '' }])
    }
  )
]
