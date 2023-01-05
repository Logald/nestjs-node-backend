import { z } from 'zod'

export const CreateUser = z.object({
  password: z.string().min(4),
  personId: z.number().min(1),
  profileId: z.number().min(1),
  active: z.boolean().optional()
})
