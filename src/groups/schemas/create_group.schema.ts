import { z } from 'zod'

export const CreateGroup = z.object({
  grade: z.number().min(1),
  name: z.string().min(1),
  description: z.string().optional(),
  turnId: z.number().min(1),
  active: z.boolean().default(true).optional()
})
