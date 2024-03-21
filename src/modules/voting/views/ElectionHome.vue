<script setup lang="ts">
import { storeToRefs } from 'pinia'
import {
  AppAlertError,
  BallotBoxCard,
  BallotBoxForm,
  CandidateForm,
  AppGenericTable as CandidateTable,
} from '../components'
import {
  useBallotBoxStore,
  useCandidateStore,
  useElectionStore,
  useVotingStore,
} from '../store'

import {
  useBallotBox,
  useCandidates,
  useHelpers,
  useElection,
} from '../composables'
import { Candidate, TableHeader } from '../types/Voting'
import { computed, ref } from 'vue'

const { addBallotBox, setBallotBoxReady, fetchBallotBox } = useBallotBox()
const { addCandidate: _addCandidate, fetchCandidates } = useCandidates()
const { setElectionStatus } = useElection()

const electionStore = useElectionStore()
const ballotBoxStore = useBallotBoxStore()
const candidateStore = useCandidateStore()
const votingStore = useVotingStore()

const { ballotsBox } = storeToRefs(ballotBoxStore)
const { election } = storeToRefs(electionStore)
const { candidates } = storeToRefs(candidateStore)

const formCandidateDialog = ref(false)
const formBallotBoxDialog = ref(false)

const candidateTableHeader: TableHeader[] = [
  {
    title: 'Nome',
    key: 'name',
  },
  {
    title: 'Numero',
    key: 'candidate_number',
  },
  {
    title: 'Identificação Única',
    key: 'id',
  },
  {
    title: 'Votos',
    key: 'additionalColumn',
  },
]

const addCandidate = async (candidate: Candidate) => {
  await _addCandidate(candidate)
  await fetchCandidates(candidate.election_id)
  formCandidateDialog.value = false
}

const handleBallotBox = async (election_id: string, site: string) => {
  await addBallotBox(election_id, site)
  await fetchBallotBox(election_id)
  formBallotBoxDialog.value = false
}

const disableBallotBox = async (ballot_box_id: string) => {
  await setBallotBoxReady(ballot_box_id, null)
}

const enableBallotBox = async (ballot_box_id: string) => {
  setBallotBoxReady(ballot_box_id, 'dc5e18db-c593-41fc-8c4c-3c58376fd88c')
}

const validElection = computed(() => {
  const requiredBallotBoxLength = ballotsBox.value.length ? true : false
  const requireCandidateLength = candidates.value.length > 1 ? true : false
  return requireCandidateLength && requiredBallotBoxLength ? true : false
})
</script>

<template>
  <v-container v-if="election">
    <h1>Administração e Contabilização</h1>
    <h2>{{ election.name }} ({{ election.organization }})</h2>
    <h3>{{ election.description }}</h3>
    <h4>Eleição em {{ useHelpers().dateBr(election.date, 'long') }}</h4>
    <v-row
      class="mt-3"
      no-gutters
    >
      <v-col
        v-if="election.status === 'created' && validElection"
        class="text-right pa-1 mb-3"
        cols="12"
        ><v-btn :to="{ name: 'ElectionReport', params: { id: election.id } }"
          >Gerar Relatório Inicial</v-btn
        ></v-col
      >
      <v-col
        v-if="election.status === 'created' && validElection"
        class="text-right pa-1 mb-3"
        cols="12"
        ><v-btn @click="setElectionStatus(election.id, 'started')"
          >Liberar Eleição</v-btn
        ></v-col
      >
      <v-col
        v-if="election.status === 'started' && validElection"
        class="text-right pa-1 mb-3"
        cols="12"
        ><v-btn @click="setElectionStatus(election.id, 'finished')"
          >Terminar eleição</v-btn
        ></v-col
      >
      <v-col
        v-if="election.status === 'finished' && validElection"
        class="text-right pa-1 mb-3"
        cols="12"
        ><v-btn :to="{ name: 'ElectionReport', params: { id: election.id } }"
          >Gerar Relatório Final</v-btn
        ></v-col
      >
    </v-row>
    <v-card
      :disabled="!['created', 'started'].includes(election.status)"
      variant="text"
    >
      <v-row>
        <v-col cols="12">
          <v-toolbar density="compact">
            <v-toolbar-title>Urnas</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
              prepend-icon="mdi-plus-thick"
              @click="formBallotBoxDialog = true"
              >Cadastrar Urna
              <v-dialog
                v-model="formBallotBoxDialog"
                max-width="500px"
              >
                <v-card>
                  <v-card-title>
                    <span class="text-h5">Cadastrar Urna</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <BallotBoxForm
                        @handle-submit="
                          (site) => handleBallotBox(election.id!, site)
                        "
                      />
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      block
                      color="warning"
                      variant="outlined"
                      @click="formBallotBoxDialog = false"
                    >
                      Cancelar
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-btn>
          </v-toolbar>
          <div class="d-flex flex-wrap justify-center mt-3">
            <BallotBoxCard
              :ballots-box="ballotsBox"
              @handle-disable="(value) => disableBallotBox(value)"
              @handle-enable="(value) => enableBallotBox(value)"
            >
              <template #noData
                ><AppAlertError text="Nenhuma urna a exibir!"
              /></template>
            </BallotBoxCard>
          </div>
        </v-col>
        <v-col>
          <CandidateTable
            v-model="formCandidateDialog"
            :headers="candidateTableHeader"
            :table-data="candidates"
            table-subject="Candidato"
            title="Candidatos"
          >
            <template #noData
              ><AppAlertError
                max-width="350"
                text="Nenhum candidato a exibir!"
            /></template>
            <template #addForm
              ><CandidateForm
                :candidate_number_length="election.candidate_number_length"
                :election_id="election.id!"
                @add-candidate="(value) => addCandidate(value)"
            /></template>
            <template #plus="props">{{
              votingStore.totalCandidateVote(props.item.id!)
            }}</template>
          </CandidateTable>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
  <v-container v-else>Nada a Mostrar</v-container>
</template>
