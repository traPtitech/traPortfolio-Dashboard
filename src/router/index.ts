import { createRouter, createWebHistory } from 'vue-router'

const Index = () => import('/@/pages/Index.vue')
const User = () => import('/@/pages/User.vue')
const UserAccounts = () => import('/@/pages/UserAccounts.vue')
const UserAccountNew = () => import('/@/pages/UserAccountNew.vue')
const UserAccountEdit = () => import('/@/pages/UserAccountEdit.vue')
const Projects = () => import('/@/pages/Projects.vue')
const Project = () => import('/@/pages/Project.vue')
const ProjectNew = () => import('/@/pages/ProjectNew.vue')
// const Events = () => import('/@/pages/Events.vue')
// const Event = () => import('/@/pages/Event.vue')
const Contests = () => import('/@/pages/Contests.vue')
const Contest = () => import('/@/pages/Contest.vue')
const ContestNew = () => import('/@/pages/ContestNew.vue')
const ContestEdit = () => import('/@/pages/ContestEdit.vue')
const ContestTeamNew = () => import('/@/pages/ContestTeamNew.vue')
const ContestTeamEdit = () => import('/@/pages/ContestTeamEdit.vue')
const NotFound = () => import('/@/pages/NotFound.vue')

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/projects',
    name: 'Projects',
    component: Projects
  },
  {
    path: '/projects/:projectId/edit',
    name: 'Project',
    component: Project
  },
  {
    path: '/projects/new',
    name: 'ProjectNew',
    component: ProjectNew
  },
  // {
  //   path: '/events',
  //   name: 'Events',
  //   component: Events
  // },
  // {
  //   path: '/events/:id',
  //   name: 'Event',
  //   component: Event
  // },
  {
    path: '/contests',
    name: 'Contests',
    component: Contests
  },
  {
    path: '/contests/:contestId',
    name: 'Contest',
    component: Contest
  },
  {
    path: '/contests/new',
    name: 'ContestNew',
    component: ContestNew
  },
  {
    path: '/contests/:contestId/edit',
    name: 'ContestEdit',
    component: ContestEdit
  },
  {
    path: '/contests/:contestId/teams/new',
    name: 'ContestTeamNew',
    component: ContestTeamNew
  },
  {
    path: '/contests/:contestId/teams/:teamId/edit',
    name: 'ContestTeamEdit',
    component: ContestTeamEdit
  },
  {
    path: '/user',
    name: 'Profile',
    component: User
  },
  {
    path: '/user/accounts',
    name: 'UserAccounts',
    component: UserAccounts
  },
  {
    path: '/user/accounts/new',
    name: 'UserAccountsNew',
    component: UserAccountNew
  },
  {
    path: '/user/accounts/:accountId/edit',
    name: 'UserAccountsEdit',
    component: UserAccountEdit
  },
  {
    path: '/:path(.*)',
    name: { name: 'NotFound' },
    component: NotFound
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
