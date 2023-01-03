import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  // eslint-disable-next-line prettier/prettier
  Post
} from '@nestjs/common';
import { z } from 'zod';
import { Absence } from './abcense.entity';
import { AbsencesProvider } from './absences.service';
import { CreateAbsence } from './schemas/create_absence.schema';
import { UpdateAbsence } from './schemas/update_absence.schema';

@Controller('absences')
export class AbsencesController {
  constructor(private absencesProvider: AbsencesProvider) {}

  @Post()
  async getAbsences(@Body() findManyOptions: Absence) {
    return this.absencesProvider.getAbsences(findManyOptions);
  }

  @Post('/all')
  getAbsencesWithRelations(@Body() findManyOptions: Absence) {
    return this.absencesProvider.getAbsencesWithRelations(findManyOptions);
  }

  @Post('/create')
  createAbsence(@Body() absenceData: z.infer<typeof CreateAbsence>) {
    return this.absencesProvider.createAbsence(absenceData);
  }

  @Get('/:id')
  getAbsence(@Param('id') absenceId: number) {
    return this.absencesProvider.getAbsence(absenceId);
  }

  @Get('/:id/all')
  getAbsenceWithRelations(@Param('id') absenceId: number) {
    return this.absencesProvider.getAbsenceWithRelations(absenceId);
  }

  @Patch('/:id')
  updateAbsence(
    @Param('id') absenceId: number,
    @Body() absenceData: z.infer<typeof UpdateAbsence>,
  ) {
    return this.absencesProvider.updateAbsense(absenceId, absenceData);
  }

  @Delete('/:id')
  deleteAbsence(@Param('id') absenceId: number) {
    return this.absencesProvider.deleteAbsence(absenceId);
  }
}
