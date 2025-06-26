import { http, HttpResponse } from 'msw'
import { Project, ProjectDetail } from '../lib/apis'
import { sampleUsers } from './users'

export const sampleProject: ProjectDetail = {
  id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
  name: 'サンプルプロジェクト -sample project-',
  description:
    'サンプルプロジェクトの説明です。 -This is a description of the sample project.-',
  duration: {
    since: { year: 2015, semester: 0 },
    until: { year: 2100, semester: 1 }
  },
  link: 'https://example.com',
  members: sampleUsers.map(user => {
    return {
      id: user.id,
      name: user.name,
      realName: user.realName,
      duration: {
        since: { year: 2015, semester: 0 },
        until: { year: 2021, semester: 1 }
      }
    }
  })
}

export const handlers = [
  // apis.getProjects
  http.get<never, never, Project[], '/api/v1/projects'>(
    '/api/v1/projects',
    () => {
      return HttpResponse.json(
        Array(10).fill({
          id: sampleProject.id,
          name: sampleProject.name,
          duration: sampleProject.duration
        })
      )
    }
  ),

  // apis.getProject
  http.get<
    { contestId: string },
    never,
    ProjectDetail,
    '/api/v1/projects/:projectsId'
  >('/api/v1/projects/:projectsId', () => {
    return HttpResponse.json(sampleProject)
  }),

  // apis.getUserProjects
  http.get<
    { userId: string },
    never,
    Project[],
    '/api/v1/users/:userId/projects'
  >('/api/v1/users/:userId/projects', () => {
    return HttpResponse.json(Array(10).fill(sampleProject))
  })
]
