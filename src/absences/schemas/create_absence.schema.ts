import { z } from 'zod';

export const CreateAbsence = z.object({
  gmpId: z.number().min(1),
  turnId: z.number().min(1),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  active: z.boolean().optional(),
});
