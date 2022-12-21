import { z } from 'zod';

export const CreateTurn = z.object({
  name: z.string().min(1),
});
