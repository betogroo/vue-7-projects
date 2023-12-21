// Composables
import { CustomRouteRecordRaw } from 'vue-router'

const routes: CustomRouteRecordRaw[] = [
  {
    path: '/password',
    component: () => import('../views/PasswordHome.vue'),
    name: 'PasswordHome',
    meta: {
      title: 'Password Generator',
      requiresAuth: false,
    },
  },
]

export default routes
