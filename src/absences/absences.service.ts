import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Gmp } from 'src/gmps/gmp.entity';
import { Turn } from 'src/turns/turn.entity';
import {
  FindManyOptions,
  FindOneOptions,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository
} from 'typeorm';
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

  private async findMany(findManyOptions: FindManyOptions) {
    const options: any = findManyOptions.where;
    if ('startDate' in options)
      options.startDate = MoreThanOrEqual(new Date(options.startDate));
    if ('endDate' in options)
      options.endDate = LessThanOrEqual(new Date(options.endDate));
    findManyOptions.where = options;
    return await this.absencesService.find(findManyOptions);
  }

  async getAbsences(findManyOptions: Absence) {
    return await this.findMany({
      where: findManyOptions,
    });
  }

  async getAbsencesWithRelations(findManyOptions: Absence) {
    return await this.findMany({
      where: findManyOptions,
      relations: ['gmp', 'turn'],
    });
  }

  private async findOne(absenceId: number, options: FindOneOptions) {
    const foundAbsence = await this.absencesService.findOne(options);
    if (!foundAbsence)
      return new HttpException('Absence not found', HttpStatus.NOT_FOUND);
    return foundAbsence;
  }
  async getAbsence(absenceId: number) {
    return await this.findOne(absenceId, { where: { id: absenceId } });
  }

  async getAbsenceWithRelations(absenceId: number) {
    return await this.findOne(absenceId, {
      where: { id: absenceId },
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
