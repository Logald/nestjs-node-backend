import { z } from 'zod'

export const Login = z.object({
  ci: z.number().min(10000000).max(99999999),
  password: z.string().min(4)
})
