<script setup lang="ts">
import { computed } from 'vue'
import { useCandidateStore, useVotingStore, useElectionStore } from '../store'
import ReportSignature from '../components/ReportSignature.vue'
import { storeToRefs } from 'pinia'
import { useHelpers } from '../composables'
const { dateBrWithTime, dateBr } = useHelpers()
const { formatCandidate } = useCandidateStore()
const candidatesStore = useCandidateStore()
const { candidates } = storeToRefs(candidatesStore)

const commission = [
  'Matheus Domiciano',
  'João Pedro Queiroz',
  'Vitor Hugo Teixeira',
  'Danilo Fukui de Oliveira',
  'Ana Paula Denoni Jordan',
  'Jaqueline Silva Badaró Gomes',
]

const nominees = [
  {
    name: 'Isabela Gonçalves de Assis',
    subtitle: 'Representante da chapa Empatia',
  },
  {
    name: 'Bernardo Medeiros Guimarães',
    subtitle: 'Representante da chapa Amor',
  },
  {
    name: 'Gustavo Poleto Santos',
    subtitle: 'Representante da chapa Mundo da Criatividade',
  },
]

const employees = [
  {
    name: 'Viviane Aparecida Costa Garcia',
    subtitle: 'Articuladora',
  },
  {
    name: 'Lígia Lopes da Silva',
    subtitle: 'Mesária',
  },
  {
    name: 'Marina Vilela',
    subtitle: 'Mesária',
  },
  {
    name: 'Robson Luis da Silva Araújo',
    subtitle: 'Conselho de Escola',
  },
]

const { totalCandidateVote: _totalCandidateVote, totalElectionVotes } =
  useVotingStore()
const votesStore = useVotingStore()
const { votes } = storeToRefs(votesStore)

const electionSTore = useElectionStore()
const { election } = storeToRefs(electionSTore)

const formattedCandidates = computed(() => {
  const winnerCandidate = candidates.value.reduce((prev, current) => {
    const totalVotesPrev = _totalCandidateVote(prev.id!)
    const totalVotesCurrent = _totalCandidateVote(current.id!)
    return totalVotesCurrent > totalVotesPrev ? current : prev
  })

  const serializedCandidates = candidates.value.map((item) => {
    const totalVotes = _totalCandidateVote(item.id!)
    const isWinner = item.id! === winnerCandidate.id
    return {
      id: item.id,
      candidate: item.name,
      avatar: item.avatar,
      number: item.candidate_number,
      votes: totalVotes,
      isWinner,
      percent: (
        (totalVotes / totalElectionVotes(election.value.id)) *
        100
      ).toFixed(2),
    }
  })

  return serializedCandidates
})
const reportStatus = computed(() => (votes.value.length ? 'finish' : 'start'))
</script>

<template>
  <v-container
    class="d-flex flex-column align-center"
    style="border: 2px dotted"
  >
    <h1>
      {{ `Relatório ${reportStatus === 'finish' ? 'Final' : 'Inicial'}` }}
    </h1>
    <v-card
      class="pa-3 ma-3"
      style="border: 2px dotted"
      variant="outlined"
    >
      <v-list
        v-if="formattedCandidates.length"
        lines="two"
      >
        <v-card-title
          >Data da Eleição: {{ dateBr(election.date) }}</v-card-title
        >
        <v-card-title
          >Total de Votos: {{ totalElectionVotes(election.id) }}</v-card-title
        >
        <v-list-item
          v-for="candidate in formattedCandidates"
          :key="candidate.id"
          :base-color="candidate.isWinner ? 'green' : 'red'"
          class="mx-6"
          :prepend-avatar="candidate.avatar"
        >
          <template #append
            ><div class="ml-6">
              {{
                `${candidate.votes} votos (${candidate.votes ? candidate.percent : '0'}%)`
              }}
            </div></template
          >
          {{ formatCandidate(candidate.id!) }}
          {{ candidate.isWinner ? '(Vencedor)' : '' }}
        </v-list-item>
      </v-list>
    </v-card>
    <div class="py-4" />
    <v-sheet>
      <v-row>
        <v-col cols="4">
          <ReportSignature
            v-for="nominee in nominees"
            :key="nominee.name"
            :name="nominee.name"
            :subtitle="nominee.subtitle"
          />
        </v-col>
        <v-col cols="4">
          <ReportSignature
            v-for="name in commission"
            :key="name"
            :name="name"
            subtitle="Comissão Eleitoral"
          />
        </v-col>
        <v-col cols="4">
          <ReportSignature
            v-for="employee in employees"
            :key="employee.name"
            :name="employee.name"
            :subtitle="employee.subtitle"
          />
        </v-col>
      </v-row>
    </v-sheet>
    <v-sheet>
      Relatório Gerado em
      {{ dateBrWithTime(new Date()) }}
    </v-sheet>
    <v-btn
      prepend-icon="mdi-arrow-left"
      :to="{ name: 'ElectionHome' }"
      >Voltar</v-btn
    >
  </v-container>
</template>
