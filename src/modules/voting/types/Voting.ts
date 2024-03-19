import { z } from 'zod'
// shared
export type { TableHeader } from '@/shared/types/App'

const required_error = 'Campo Obrigatório'

export const candidateSchema = z.object({
  id: z.string().uuid().optional(),
  created_at: z.string().nullish(),
  name: z.string().min(1, 'Obrigatório'),
  avatar: z.string().url('Url inválida').default(''),
  election_id: z.string(),
  candidate_number: z.string(),
})

export const candidatesSchema = z.array(candidateSchema)

export const voteSchema = z.object({
  id: z.string().uuid().nullish(),
  created_at: z.string().nullish(),
  candidate_id: z.string().uuid(),
  election_id: z.string(),
  voter_id: z.string().uuid().nullish(),
  ballot_box_id: z.string().uuid(),
})

export const voterSchema = z.object({
  id: z.string(),
  created_at: z.string().optional(),
  name: z.string().min(1, 'Obrigatório'),
  ra: z.number(),
})

const ELECTION_STATUS = ['created', 'started', 'finished'] as const
const electionStatusSchema = z.enum(ELECTION_STATUS)
export type ElectionStatus = z.infer<typeof electionStatusSchema>

export const electionSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string(),
  date: z.string({ required_error }),
  name: z.string({ required_error }),
  description: z.string({ required_error }),
  uppercase: z.boolean().default(false),
  ready: z.boolean().default(false),
  organization: z.string({ required_error }).min(1, 'Obrigatório'),
  candidate_number_length: z
    .number({ invalid_type_error: 'Apenas Números' })
    .min(1, 'O número deve ser entre 1 e 5')
    .max(5, 'O número deve ser entre 1 e 5'),
  status: electionStatusSchema,
})

export const insertElectionSchema = electionSchema.merge(
  z.object({
    id: z.string().uuid().optional(),
    created_at: z.string().optional(),
    status: electionStatusSchema.optional(),
  }),
)

export const ballotBoxSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string(),
  site: z.string(),
  ready: z.nullable(z.string()).default(null),
  election_id: z.string(),
})

export type Candidate = z.infer<typeof candidateSchema>
export type Vote = z.infer<typeof voteSchema>
export type Voter = z.infer<typeof voterSchema>
export type Election = z.infer<typeof electionSchema>
export type ElectionInsert = z.infer<typeof insertElectionSchema>
export type BallotBox = z.infer<typeof ballotBoxSchema>
