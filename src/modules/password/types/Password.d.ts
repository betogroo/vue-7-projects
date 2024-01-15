import { z } from 'zod'

const colorsSchema = z.enum(['error', 'warning', 'success'])
const messagesSchema = z.enum(['fraca', 'razoável', 'forte'])
const strongSchema = z.boolean().nullish()

export const securityLevelSchema = z.object({
  color: z.infer<typeof colorsSchema>,
  message: z.infer<typeof messagesSchema>,
  strong: z.infer<typeof strongSchema>,
})

export type colors = z.infer<typeof colorsSchema>

export type SecurityLevel = z.infer<typeof securityLevelSchema>
