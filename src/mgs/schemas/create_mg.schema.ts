import { z } from 'zod';

export const CreateMg = z.object({
  matterId: z.number().nonnegative({ message: 'Min value is 1' }),
  groupId: z.number().nonnegative({ message: 'Min value is 1' }),
});
