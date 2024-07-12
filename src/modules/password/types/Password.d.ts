import { z } from 'zod'

const colorsSchema = z.enum(['error', 'warning', 'success'])
const messagesSchema = z.enum(['fraca', 'razoável', 'forte'])
const strongSchema = z.boolean()

export const securityLevelSchema = z.object({
  color: colorsSchema,
  message: messagesSchema,
  strong: strongSchema,
})

export type colors = z.infer<typeof colorsSchema>

export type SecurityLevel = z.infer<typeof securityLevelSchema>
