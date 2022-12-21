import { z } from 'zod';

export const CreateGmp = z.object({
  matterId: z.number().min(1),
  groupId: z.number().min(1),
  proffessorId: z.number().min(1).optional(),
});
