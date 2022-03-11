import { createRouter, createWebHistory } from 'vue-router'

const Index = () => import('/@/pages/Index.vue')
const User = () => import('/@/pages/User.vue')
const Projects = () => import('/@/pages/Projects.vue')
const Project = () => import('/@/pages/Project.vue')
const Events = () => import('/@/pages/Events.vue')
const Event = () => import('/@/pages/Event.vue')
const Contests = () => import('/@/pages/Contests.vue')
const Contest = () => import('/@/pages/Contest.vue')
const ContestCreate = () => import('/@/pages/ContestCreate.vue')

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
    path: '/contests/create',
    name: 'ContestCreate',
    component: ContestCreate
  },
  {
    path: '/user',
    name: 'Profile',
    component: User
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
