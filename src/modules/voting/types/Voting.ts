import { z } from 'zod'

export const candidateSchema = z.object({
  id: z.string().uuid().nullish(),
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
  created_at: z.string(),
  name: z.string().min(1, 'Obrigatório'),
  ra: z.number(),
})

export const electionSchema = z.object({
  id: z.string().uuid().optional(),
  created_at: z.string().nullish(),
  date: z.string(),
  name: z.string().min(1, 'Obrigatório'),
  description: z.string(),
  uppercase: z.boolean().nullish(),
  ready: z.boolean().nullish(),
  organization: z.string().nullish(),
  candidate_number_length: z.number().default(3),
})

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
export type BallotBox = z.infer<typeof ballotBoxSchema>
