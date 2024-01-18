import { z } from 'zod'

export const candidateSchema = z.object({
  id: z.number(),
  name: z.string().min(1, 'Obrigatório'),
  avatar: z.string().url('Url inválida'),
})

export const votesSchema = z.object({
  id: z.number(),
  votes: z.number(),
})

export type Candidate = z.infer<typeof candidateSchema>
export type Votes = z.infer<typeof votesSchema>
