// Composables
import { CustomRouteRecordRaw } from 'vue-router'

const routes: CustomRouteRecordRaw[] = [
  {
    path: '/voting',
    component: () => import('../views/VotingHome.vue'),
    name: 'VotingHome',
    meta: {
      title: 'Sistema de Votação',
      requiresAuth: false,
    },
  },
  {
    path: '/voting/admin',
    component: () => import('../views/AdminHome.vue'),
    name: 'AdminHome',
    meta: {
      title: 'Administração e Contabilização',
      requiresAuth: true,
    },
  },
]

export default routes
