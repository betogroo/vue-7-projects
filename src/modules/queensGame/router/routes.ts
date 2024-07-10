// Composables
import { CustomRouteRecordRaw } from 'vue-router'

const routes: CustomRouteRecordRaw[] = [
  {
    path: '/queensgame',
    component: () => import('../views/QueensGameHome.vue'),
    name: 'QueensGameHome',
    meta: {
      title: 'Jogo da Rainha',
      requiresAuth: false,
      icon: '',
    },
  },
]

export default routes
