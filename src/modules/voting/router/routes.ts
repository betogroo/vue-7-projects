// Composables
import { CustomRouteRecordRaw } from 'vue-router'
import { useElection, useVoters, useCandidates } from '../composables'

const routes: CustomRouteRecordRaw[] = [
  {
    path: '/voting/:id',
    component: () => import('../views/VotingHome.vue'),
    name: 'VotingHome',
    meta: {
      title: 'Sistema de Votação',
      requiresAuth: false,
      hideNavBar: true,
    },
    props: (router) => ({ id: +router.params.id }),
    beforeEnter: async (to) => {
      const election_id = +to.params.id
      const { getElection } = useElection()
      const { fetchVoters } = useVoters()
      const { fetchCandidates } = useCandidates()
      try {
        const election = await getElection(election_id)
        await fetchCandidates(election_id)
        const voters = await fetchVoters()
        if (!election)
          console.log('Eleição n]ão encontrada. Criar uma rota para erro')
        if (!voters) console.log('Não ha eleitores')
      } catch (err) {
        console.log(err)
      }
    },
  },
  {
    path: '/election/:id',
    component: () => import('../views/ElectionHome.vue'),
    name: 'ElectionHome',
    meta: {
      title: 'Sistema de Votação',
      requiresAuth: false,
      hideNavBar: false,
    },
    props: (router) => ({ id: +router.params.id }),
    beforeEnter: async (to, from, next) => {
      const election_id = +to.params.id
      const { getElection } = useElection()
      const { fetchCandidates } = useCandidates()
      try {
        const election = await getElection(election_id)
        const candidates = await fetchCandidates(election_id)
        console.log(candidates)
        if (!election) next({ name: 'AboutView' })
        next()
      } catch (err) {
        console.log(err)
      }
      console.log(to.params.id)
    },
  },
  {
    path: '/voting/admin',
    component: () => import('../views/AdminHome.vue'),
    name: 'AdminHome',
    meta: {
      title: 'Administração',
      requiresAuth: true,
    },
    beforeEnter: async (to, from, next) => {
      const { fetchElections } = useElection()
      try {
        const elections = await fetchElections()
        if (!elections) next({ name: 'AboutView' })
        next()
      } catch (err) {
        console.log(err)
        next({ name: 'AboutView' })
      }
      //console.log(store)
    },
  },
]

export default routes
