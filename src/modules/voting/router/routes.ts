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
      const election_id = +to.params.id
      const { getElection } = useElection()
      const { fetchCandidates } = useCandidates()
      const { fetchBallotBox } = useBallotBox()
      const { fetchVoters } = useVoters()
      try {
        const [election, candidates, ballotsBox, voters] = await Promise.all([
          await getElection(election_id),
          await fetchCandidates(election_id),
          await fetchBallotBox(election_id),
          await fetchVoters(),
        ])
        if (!election || !candidates || !ballotsBox || !voters)
          throw Error('Algumas das consultas falharam')
        next()
      } catch (err) {
        console.log('Erro: ', err)
        next({ name: 'NotFoundVoting' })
      }
    },
  },
  {
    path: '/voting',
    component: () => import('../views/VotingHome.vue'),
    name: 'VotingHome',
    meta: {
      title: 'Sistema de Votação',
      requiresAuth: true,
    },
    beforeEnter: async (to, from, next) => {
      const { fetchElections } = useElection()
      try {
        const elections = await fetchElections()
        if (!elections || !elections.length)
          throw new Error('Não foram encontradas eleições')
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
    props: (router) => ({ id: router.params.id }),
    beforeEnter: async (to, from, next) => {
      const { getBallotBox } = useBallotBox()
      const { getElection } = useElection()
      const { fetchCandidates } = useCandidates()
      const { fetchVoters } = useVoters()
      const ballot_box_id = to.params.id.toString()
      try {
        const [ballotBox, voters] = await Promise.all([
          await getBallotBox(ballot_box_id),
          await fetchVoters(),
        ])
        if (!ballotBox) throw Error('Urna não encontrada')
        const election_id = ballotBox.election_id
        const [candidates, election] = await Promise.all([
          await fetchCandidates(election_id),
          await getElection(election_id),
        ])
        console.log(ballotBox, voters, candidates, election)
        next()
      } catch (err) {
        console.log(err)
      }
      //console.log(store)
    },
    children: [
      {
        name: 'BallotBoxView',
        path: 'urna',
        component: () => import('../views/BallotBoxView.vue'),
        props: (router) => ({ id: router.params.id }),
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
