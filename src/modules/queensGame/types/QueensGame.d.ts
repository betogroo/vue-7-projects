import { z } from 'zod'

const gridContentSchema = z.enum(['queen', 'marked', ''])

export type GridContent = z.infer<typeof gridContentSchema>
