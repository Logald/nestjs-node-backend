import { z } from 'zod';

export const CreatePeople = z.object({
  name: z.string().min(1),
  lastname: z.string().min(1),
  ci: z.number().min(8).max(8),
});
