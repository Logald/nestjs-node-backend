import { z } from 'zod';

export const CreateSpecialty = z.object({
  matterId: z.number().min(1),
  proffessorId: z.number().min(1),
});
