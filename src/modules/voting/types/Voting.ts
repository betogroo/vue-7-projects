import { z } from 'zod'

export const candidateSchema = z.object({
  id: z.number(),
  name: z.string().min(1, 'Obrigatório'),
  avatar: z.string().url('Url inválida'),
  created_at: z.string(),
})

export const candidatesSchema = z.array(candidateSchema)
export const votesSchema = z.array(
  z.object({
    id: z.string().uuid().nullish(),
    created_at: z.string().nullish(),
    candidate_id: z.number(),
    election_id: z.number(),
    voter_id: z.string().uuid().nullish(),
  }),
)

export const voterSchema = z.object({
  id: z.string(),
  created_at: z.string(),
  name: z.string().min(1, 'Obrigatório'),
  ra: z.number(),
})

export const electionSchema = z.object({
  id: z.number().nullish(),
  created_at: z.string().nullish(),
  date: z.string(),
  name: z.string().min(1, 'Obrigatório'),
  description: z.string(),
  uppercase: z.boolean().nullish(),
  ready: z.boolean().nullish(),
  organization: z.string().nullish(),
})

export type Candidate = z.infer<typeof candidateSchema>
export type Votes = z.infer<typeof votesSchema>
export type Voter = z.infer<typeof voterSchema>
export type Election = z.infer<typeof electionSchema>
