import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Gmp } from 'src/gmps/gmp.entity';
import { Turn } from 'src/turns/turn.entity';
import { Repository } from 'typeorm';
import { z } from 'zod';
import { Absence } from './abcense.entity';
import { CreateAbsence } from './schemas/create_absence.schema';

@Injectable()
export class AbsencesProvider {
  constructor(
    @InjectRepository(Absence) private absencesService: Repository<Absence>,
    @InjectRepository(Gmp) private gmpsService: Repository<Gmp>,
    @InjectRepository(Turn) private turnsService: Repository<Turn>,
  ) {}

  async getAbsences(findManyOptions: Absence) {
    return await this.absencesService.find({
      where: findManyOptions,
    });
  }

  async getAbsencesWithRelations(findManyOptions: Absence) {
    return await this.absencesService.find({
      where: findManyOptions,
      relations: ['gmp', 'turn'],
    });
  }

  async createAbsence(absenceData: z.infer<typeof CreateAbsence>) {
    const passFormat = CreateAbsence.safeParse(absenceData);
    if (!passFormat.success)
      return new HttpException('Invalid format', HttpStatus.NOT_ACCEPTABLE);
    absenceData = passFormat.data;
    const gmpFound = await this.gmpsService.findOne({
      where: { id: absenceData.gmpId },
    });
    if (!gmpFound)
      return new HttpException('Gmp not found', HttpStatus.NOT_ACCEPTABLE);
    const turnFound = await this.turnsService.findOne({
      where: { id: absenceData.turnId },
    });
    if (!turnFound)
      return new HttpException('Turn not found', HttpStatus.NOT_ACCEPTABLE);
    return await this.absencesService.insert(absenceData);
  }
}
