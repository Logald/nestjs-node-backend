import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
  UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AccessTokenGuard } from 'src/users/accessTokenGuard';
import { AbsencesProvider } from './absences.service';
import { CreateAbsenceDto } from './dtos/create_absence.dto';
import { FindAbsenceDto } from './dtos/find_absence.dto';
import { UpdateAbsenceDto } from './dtos/update_absence.dto';

@UseGuards(AccessTokenGuard)
@ApiBearerAuth()
@ApiTags('api/absences')
@Controller('api/absences')
export class AbsencesController {
  constructor (private readonly absencesProvider: AbsencesProvider) { }

  @Post()
  async getAbsences (@Body() findManyOptions: FindAbsenceDto) {
    return await this.absencesProvider.getAbsences(findManyOptions);
  }

  @Post('/all')
  async getAbsencesWithRelations (@Body() findManyOptions: FindAbsenceDto) {
    return await this.absencesProvider.getAbsencesWithRelations(
      findManyOptions
    );
  }

  @Post('/create')
  async createAbsence (@Body() absenceData: CreateAbsenceDto, @Res() res: Response) {
    return res.json(await this.absencesProvider.createAbsence(absenceData));
  }

  @Get('/:id')
  async getAbsence (@Param('id', ParseIntPipe) absenceId: number) {
    return await this.absencesProvider.getAbsence(absenceId);
  }

  @Get('/:id/all')
  async getAbsenceWithRelations (@Param('id', ParseIntPipe) absenceId: number) {
    return await this.absencesProvider.getAbsenceWithRelations(absenceId);
  }

  @Put('/:id')
  async updateAbsence (
  @Param('id', ParseIntPipe) absenceId: number,
    @Body() absenceData: UpdateAbsenceDto,
    @Res() res: Response
  ) {
    return res.json(await this.absencesProvider.updateAbsense(absenceId, absenceData));
  }

  @Delete('/:id')
  async deleteAbsence (@Param('id', ParseIntPipe) absenceId: number, @Res() res: Response) {
    return res.json(await this.absencesProvider.deleteAbsence(absenceId));
  }
}
