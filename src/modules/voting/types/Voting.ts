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
  }),
)

export const ConfigSchema = z.object({
  id: z.string().nullish(),
  created_at: z.string().nullish(),
  uppercase: z.boolean().nullish(),
  ready: z.boolean().nullish(),
  organization: z.string().nullish(),
})

export const voterSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  name: z.string().min(1, 'Obrigatório'),
  ra: z.number(),
})

export type Candidate = z.infer<typeof candidateSchema>
export type Votes = z.infer<typeof votesSchema>
export type Config = z.infer<typeof ConfigSchema>
export type Voter = z.infer<typeof voterSchema>
