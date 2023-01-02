import { Body, Controller, Post } from '@nestjs/common';
import { z } from 'zod';
import { AbsencesProvider } from './absences.service';
import { CreateAbsence } from './schemas/create_absence.schema';

@Controller('absences')
export class AbsencesController {
  constructor(private absencesProvider: AbsencesProvider) {}

  @Post('/create')
  createAbsence(@Body() absenceData: z.infer<typeof CreateAbsence>) {
    return this.absencesProvider.createAbsence(absenceData);
  }
}
