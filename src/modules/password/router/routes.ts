// Composables
import { CustomRouteRecordRaw } from 'vue-router'

const routes: CustomRouteRecordRaw[] = [
  {
    path: '/password',
    component: () => import('../views/PasswordHome.vue'),
    name: 'PasswordHome',
    meta: {
      title: 'Gerador de Senha',
      requiresAuth: false,
      icon: '',
    },
  },
]

export default routes
