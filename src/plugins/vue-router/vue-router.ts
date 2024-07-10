// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { routes as main } from '@/modules/main/router'
import { routes as password } from '@/modules/password/router'
import { routes as voting } from '@/modules/voting/router'
import { routes as queensGame } from '@/modules/queensGame/router'
import beforeEach from './beforeEach'

const routes = [...main, ...password, ...voting, ...queensGame]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})
router.beforeEach(beforeEach)

export default router
