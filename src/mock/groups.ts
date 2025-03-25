import { http, HttpResponse } from 'msw'
import { Group, GroupDetail } from '/@/lib/apis'

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
  )
]
