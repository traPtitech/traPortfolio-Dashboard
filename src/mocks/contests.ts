import { http, HttpResponse } from 'msw'
import { Contest, ContestDetail, ContestTeamDetail } from '../lib/apis'
import { sampleUsers } from './users'

const sampleContestTeamDetails: ContestTeamDetail[] = [
  {
    id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    name: 'チーム優勝',
    description: 'これはサンプルのチームです。',
    result: '優勝',
    members: sampleUsers,
    link: 'https://example.com'
  },
  {
    id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    name: 'チーム準優勝',
    description: 'これはサンプルのチームです。',
    result: '準優勝',
    members: sampleUsers,
    link: 'https://example.com'
  },
  {
    id: 'cccccccc-cccc-cccc-cccc-cccccccccccc',
    name: 'チーム3位',
    description: 'これはサンプルのチームです。',
    result: '3位',
    members: sampleUsers,
    link: 'https://example.com'
  }
]

const sampleContestDetail: ContestDetail = {
  id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
  name: 'サンプルコンテスト -sample contest-',
  description:
    'これはサンプルのコンテストです。\n←に改行が仕込まれている文字列です。',
  duration: {
    since: '2021-01-01T00:00:00Z',
    until: '2024-01-01T00:00:00Z'
  },
  link: '',
  teams: sampleContestTeamDetails.map(team => {
    return {
      id: team.id,
      name: team.name,
      result: team.result,
      members: team.members
    }
  })
}

export const handlers = [
  // apis.getContests
  http.get<never, never, Contest[], '/api/v1/contests'>(
    '/api/v1/contests',
    () => {
      return HttpResponse.json(
        Array(20).fill({
          id: sampleContestDetail.id,
          name: sampleContestDetail.name,
          duration: {
            since: sampleContestDetail.duration.since,
            until: sampleContestDetail.duration.until
          }
        })
      )
    }
  ),

  // apis.getContest
  http.get<
    { contestId: string },
    never,
    ContestDetail,
    '/api/v1/contests/:contestId'
  >('/api/v1/contests/:contestId', () => {
    return HttpResponse.json(sampleContestDetail)
  }),

  // apis.getContestTeam
  http.get<
    { contestId: string; teamId: string },
    never,
    ContestTeamDetail,
    '/api/v1/contests/:contestId/teams/:teamId'
  >('/api/v1/contests/:contestId/teams/:teamId', () => {
    return HttpResponse.json(sampleContestTeamDetails[0])
  }),

  // apis.getUserContests
  http.get<
    { userId: string },
    never,
    Contest[],
    '/api/v1/users/:userId/contests'
  >('/api/v1/users/:userId/contests', () => {
    return HttpResponse.json(
      Array(20).fill({
        id: sampleContestDetail.id,
        name: sampleContestDetail.name,
        duration: {
          since: sampleContestDetail.duration.since,
          until: sampleContestDetail.duration.until
        }
      })
    )
  })
]
