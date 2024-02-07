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
    props: (router) => ({ id: +router.params.id }),
    beforeEnter: async (to, from, next) => {
      const election_id = +to.params.id
      const { getElection } = useElection()
      const { fetchCandidates } = useCandidates()
      const { fetchBallotBox } = useBallotBox()
      const { fetchVoters } = useVoters()
      try {
        const election = await getElection(election_id)
        const candidates = await fetchCandidates(election_id)
        const ballotBox = await fetchBallotBox(election_id)
        const voters = await fetchVoters()
        console.log({ candidates, ballotBox, voters })
        if (!election) next({ name: 'AboutView' })
        next()
      } catch (err) {
        console.log(err)
      }
      console.log(to.params.id)
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
        if (!elections) next({ name: 'AboutView' })
        next()
      } catch (err) {
        console.log(err)
        next({ name: 'AboutView' })
      }
      //console.log(store)
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
      console.log(to)
      try {
        const ballotBox = await getBallotBox(ballot_box_id)
        if (!ballotBox) throw Error('Urna não encontrada')
        const election_id = ballotBox.election_id
        await fetchCandidates(election_id)
        await fetchVoters()
        const election = await getElection(election_id)

        console.log(ballotBox, election)
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
]

export default routes
