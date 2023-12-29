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
]

export default routes
