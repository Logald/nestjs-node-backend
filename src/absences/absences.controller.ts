import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards
} from '@nestjs/common'
import { AccessTokenGuard } from 'src/users/accessTokenGuard'
import { UpdateResult } from 'typeorm'
import { z } from 'zod'
import { Absence } from './abcense.entity'
import { AbsencesProvider } from './absences.service'
import { CreateAbsence } from './schemas/create_absence.schema'
import { UpdateAbsence } from './schemas/update_absence.schema'

@UseGuards(AccessTokenGuard)
@Controller('absences')
export class AbsencesController {
  constructor (private readonly absencesProvider: AbsencesProvider) {}

  @Post()
  async getAbsences (@Body() findManyOptions: Absence) {
    return await this.absencesProvider.getAbsences(findManyOptions)
  }

  @Post('/all')
  async getAbsencesWithRelations (@Body() findManyOptions: Absence) {
    return await this.absencesProvider.getAbsencesWithRelations(findManyOptions)
  }

  @Post('/create')
  async createAbsence (@Body() absenceData: z.infer<typeof CreateAbsence>) {
    return await this.absencesProvider.createAbsence(absenceData)
  }

  @Get('/:id')
  async getAbsence (@Param('id') absenceId: number) {
    return await this.absencesProvider.getAbsence(absenceId)
  }

  @Get('/:id/all')
  async getAbsenceWithRelations (@Param('id') absenceId: number) {
    return await this.absencesProvider.getAbsenceWithRelations(absenceId)
  }

  @Patch('/:id')
  async updateAbsence (
    @Param('id') absenceId: number,
      @Body() absenceData: z.infer<typeof UpdateAbsence>
  ): Promise<UpdateResult> {
    return await this.absencesProvider.updateAbsense(absenceId, absenceData)
  }

  @Delete('/:id')
  async deleteAbsence (@Param('id') absenceId: number) {
    return await this.absencesProvider.deleteAbsence(absenceId)
  }
}
