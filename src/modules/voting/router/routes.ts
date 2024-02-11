// Composables
import { CustomRouteRecordRaw } from 'vue-router'
import {
  useElection,
  useCandidates,
  useBallotBox,
  useVoters,
} from '../composables'

const routes: CustomRouteRecordRaw[] = [
  {
    path: '/voting',
    component: () => import('../views/VotingHome.vue'),
    name: 'VotingHome',
    meta: {
      title: 'Sistema de Votação',
      requiresAuth: true,
    },
    beforeEnter: async (to, from, next) => {
      try {
        const elections = await useElection().fetchElections()
        if (!elections) throw new Error('Não foram encontradas eleições')
        next()
      } catch (err) {
        console.error(err)
        next({ name: 'NotFoundVoting' })
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
    //props: (router) => ({ id: +router.params.id }),
    beforeEnter: async (to, from, next) => {
      const election_id = to.params.id.toString()
      try {
        const [election, candidates, ballotsBox, voters] = await Promise.all([
          useElection().getElection(election_id),
          useCandidates().fetchCandidates(election_id),
          useBallotBox().fetchBallotBox(election_id),
          useVoters().fetchVoters(),
        ])
        if (!election) throw Error('Erro ao carregar a eleição')
        if (!candidates) throw Error('Erro ao carregar os candidatos')
        if (!ballotsBox) throw Error('Erro ao carregar as urnas')
        if (!voters) throw Error('Erro ao carregar os eleitores')
        next()
      } catch (err) {
        console.error(err)
        next({ name: 'NotFoundVoting' })
      }
    },
  },
  {
    path: '/voting/ballotbox/:id',
    meta: {
      title: 'Urna',
      requiresAuth: true,
    },
    beforeEnter: async (to, from, next) => {
      const ballot_box_id = to.params.id.toString()
      try {
        const ballotBox = await useBallotBox().getBallotBox(ballot_box_id)
        if (!ballotBox) throw new Error('Urna não encontrada')
        const election_id = ballotBox.election_id
        const [candidates, election, voters] = await Promise.all([
          useCandidates().fetchCandidates(election_id),
          useElection().getElection(election_id),
          useVoters().fetchVoters(),
        ])
        if (!election) throw new Error('Eleição não encontrada')
        if (!candidates)
          throw new Error('Não foi possível listar os candidatos')
        if (!voters) throw new Error('Não foi possível listar os eleitores')
        next()
      } catch (err) {
        console.error(err)
        next({ name: 'NotFoundVoting' })
      }
    },
    children: [
      {
        name: 'BallotBoxView',
        path: 'urna',
        component: () => import('../views/BallotBoxView.vue'),
      },
      {
        name: 'BallotBoxAdmin',
        path: 'admin',
        component: () => import('../views/BallotBoxAdmin.vue'),
      },
    ],
  },
  {
    path: '/voting/notfound',
    name: 'NotFoundVoting',
    component: () => import('../views/NotFoundElection.vue'),
    meta: {
      requiresAuth: false,
      title: 'Não encontrado',
    },
  },
]

export default routes
