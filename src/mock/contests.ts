import { http, HttpResponse } from 'msw'
import { Contest, ContestDetail } from '../lib/apis'

export const handlers = [
  // apis.getContests
  http.get<never, never, Contest[], '/api/v1/contests'>(
    '/api/v1/contests',
    () => {
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
  ),

  // apis.getContest
  http.get<
    { contestId: string },
    never,
    ContestDetail,
    '/api/v1/contests/:contestId'
  >('/api/v1/contests/:contestId', () => {
    return HttpResponse.json({
      id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
      name: 'sampleContest',
      description: 'sampleContest',
      duration: {
        since: '2021-01-01T00:00:00Z',
        until: '2021-01-01T00:00:00Z'
      },
      link: '',
      teams: []
    })
  })
]