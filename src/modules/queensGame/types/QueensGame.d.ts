import { z } from 'zod'

export const gridContentSchema = z
  .enum(['queen', 'marked', ''])
  .default('')
  .optional()
export const gridSectionSchema = z.number().optional()
export const gridColorSchema = z.string().optional()

export const boardItemSchema = z.object({
  content: gridContentSchema,
  section: gridSectionSchema,
  color: gridColorSchema,
})
export const queenSchema = z.object({
  row: z.number(),
  col: z.number(),
  valid: z.boolean(),
})

export type Queen = z.infer<typeof queenSchema>

export const boardSchema = z.array(z.array(boardItemSchema))

export const cellColorsSchema = z.record(z.string())

export type GridContent = z.infer<typeof gridContentSchema>
export type GridSection = z.infer<typeof gridSectionSchema>
export type GridColor = z.infer<typeof gridColorSchema>
export type CellColors = z.infer<typeof cellColorsSchema>

export type BoardItem = z.infer<typeof boardItemSchema>

export type Board = z.infer<typeof boardSchema>
