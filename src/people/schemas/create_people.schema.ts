import { z } from 'zod';

export const CreatePeople = z.object({
  name: z.string().min(1),
  lastname: z.string().min(1),
  ci: z.string().length(8),
});
