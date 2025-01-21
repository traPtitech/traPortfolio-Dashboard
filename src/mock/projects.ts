import { http, HttpResponse } from 'msw'
import { Project, ProjectDetail } from '../lib/apis'

export const handlers = [
  // apis.getProjects
  http.get<never, never, Project[], '/api/v1/projects'>(
    '/api/v1/projects',
    () => {
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
  ),

  // apis.getProject
  http.get<
    { contestId: string },
    never,
    ProjectDetail,
    '/api/v1/projects/:projectsId'
  >('/api/v1/projects/:projectsId', () => {
    return HttpResponse.json({
      id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
      name: 'sampleProject',
      description: 'sampleProject',
      duration: {
        since: { year: 2021, semester: 1 },
        until: { year: 2021, semester: 1 }
      },
      link: '',
      members: []
    })
  })
]