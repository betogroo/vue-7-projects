import { z } from 'zod'

export const AppSchema = z.object({
  title: z.string().min(1, 'Campo Obrigatório'),
  description: z.string().min(1, 'Campo Obrigatório'),
  name: z.string().min(1, 'Campo Obrigatório'),
})

export type App = z.infer<typeof AppSchema>
