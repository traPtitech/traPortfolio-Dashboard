import { createRouter, createWebHistory } from 'vue-router'

const Index = () => import('/@/pages/Index.vue')
const Users = () => import('/@/pages/Users.vue')
const UserAccounts = () => import('/@/pages/UserAccounts.vue')
const UserAccountNew = () => import('/@/pages/UserAccountNew.vue')
const Projects = () => import('/@/pages/Projects.vue')
const Project = () => import('/@/pages/Project.vue')
const ProjectMembers = () => import('/@/pages/ProjectMembers.vue')
const Events = () => import('/@/pages/Events.vue')
const Event = () => import('/@/pages/Event.vue')
const Contests = () => import('/@/pages/Contests.vue')
const Contest = () => import('/@/pages/Contest.vue')
const ContestEdit = () => import('/@/pages/ContestEdit.vue')
const ContestTeamEdit = () => import('/@/pages/ContestTeamEdit.vue')
const ContestNew = () => import('/@/pages/ContestNew.vue')

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
    path: '/projects/:id',
    name: 'Project',
    component: Project
  },
  {
    path: '/projects/:id/members',
    name: 'ProjectMembers',
    component: ProjectMembers
  },
  {
    path: '/events',
    name: 'Events',
    component: Events
  },
  {
    path: '/events/:id',
    name: 'Event',
    component: Event
  },
  {
    path: '/contests',
    name: 'Contests',
    component: Contests
  },
  {
    path: '/contests/:id',
    name: 'Contest',
    component: Contest
  },
  {
    path: '/contests/new',
    name: 'ContestNew',
    component: ContestNew
  },
  {
    path: '/contests/:contestId/teams/:teamId/edit',
    name: 'ContestTeamEdit',
    component: ContestTeamEdit
  },
  {
    path: '/contests/:contestId/edit',
    name: 'ContestEdit',
    component: ContestEdit
  },
  {
    path: '/users',
    name: 'Profile',
    component: Users
  },
  {
    path: '/users/accounts',
    name: 'UserAccounts',
    component: UserAccounts
  },
  {
    path: '/users/accounts/new',
    name: 'UserAccountsNew',
    component: UserAccountNew
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
