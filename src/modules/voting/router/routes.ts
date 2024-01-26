// Composables
import { CustomRouteRecordRaw } from 'vue-router'
import { useElection, useVoting, useVoters } from '../composables'

const routes: CustomRouteRecordRaw[] = [
  {
    path: '/voting',
    component: () => import('../views/VotingHome.vue'),
    name: 'VotingHome',
    meta: {
      title: 'Sistema de Votação',
      requiresAuth: false,
      hideNavBar: true,
    },
    beforeEnter: async () => {
      const { getElection } = useElection()
      const { fetchCandidates } = useVoting()
      const { fetchVoters } = useVoters()
      try {
        const election = await getElection(7)
        const voters = await fetchVoters()
        if (!election)
          console.log('Eleição n]ão encontrada. Criar uma rota para erro')
        if (!voters) console.log('Não a eleitores')
        await fetchCandidates()
      } catch (err) {
        console.log(err)
      }
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
    beforeEnter: async (to, from, next) => {
      const { getElection } = useElection()
      const { fetchVotes } = useVoting()
      try {
        const election = await getElection(7)
        if (!election) throw Error('Eleição não encontrada')
        const votes = await fetchVotes(7)
        if (!votes?.length) throw Error('Votos não encontrados')
        next()
      } catch (err) {
        console.log(err)
        next({ path: '/:catchAll(.*)' })
      }
      //console.log(store)
    },
  },
]

export default routes
