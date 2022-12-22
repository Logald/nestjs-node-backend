import { z } from 'zod';

export const CreateProffessor = z.object({
  personId: z.number().min(1),
  active: z.boolean().optional(),
});
