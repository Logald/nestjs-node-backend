import { z } from 'zod'

export const CreateProfile = z.object({
  type: z.string().min(1)
})
