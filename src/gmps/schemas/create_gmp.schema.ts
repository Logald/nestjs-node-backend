import { z } from 'zod';

export const CreateGmp = z.object({
  mgId: z.number().min(1),
  proffessorId: z.number().min(1).optional(),
  active: z.boolean().optional(),
});
