import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { Gmp } from 'src/gmps/gmp.entity';
import { GmpsProvider } from 'src/gmps/gmps.service';
import { Turn } from 'src/turns/turn.entity';
import { TurnsProvider } from 'src/turns/turns.service';
import {
  absenceFoundError,
  absenceNotFoundError,
  invalidDatesError,
  startDateError
} from 'src/utils/errors.utils';
import {
  FindManyOptions,
  FindOneOptions,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository
} from 'typeorm';
import { Absence } from './abcense.entity';
import { CreateAbsenceDto } from './dtos/create_absence.dto';
import { FindAbsenceDto } from './dtos/find_absence.dto';
import { UpdateAbsenceDto } from './dtos/update_absence.dto';

@Injectable()
export class AbsencesProvider {
  private readonly dateFormat = 'YYYY-MM-DD HH:mm:ss.SSS';
  constructor(
    @InjectRepository(Absence) private readonly absencesService: Repository<Absence>,
    @InjectRepository(Gmp) private readonly gmpsService: Repository<Gmp>,
    @InjectRepository(Turn) private readonly turnsService: Repository<Turn>,
    private readonly gmpsProvider: GmpsProvider,
    private readonly turnsProvider: TurnsProvider,
  ) {
    setInterval(() => {
      this.absencesService
        .createQueryBuilder()
        .update()
        .where('endDate < :endDate and active = true', {
          endDate: new Date()
        })
        .set({ active: false })
        .execute();
    }, 10000);
  }

  private async findMany(findManyOptions: FindManyOptions) {
    const options = findManyOptions.where;
    if ('startDate' in options) {
      options.startDate = MoreThanOrEqual(new Date(options.startDate));
    }
    if ('endDate' in options) {
      options.endDate = LessThanOrEqual(new Date(options.endDate));
    }
    findManyOptions.where = options;
    let absences = await this.absencesService.find(findManyOptions)
    absences = absences.map((abcence) => {
      abcence.startDate = new Date(moment(abcence.startDate).subtract(3, 'hour').format(this.dateFormat));
      abcence.endDate = new Date(moment(abcence.endDate).subtract(3, 'hour').format(this.dateFormat));
      return abcence;
    });
    return absences;
  }

  async getAbsences(findManyOptions: FindAbsenceDto) {
    return await this.findMany({
      where: findManyOptions,
    });
  }

  async getAbsencesWithRelations(findManyOptions: FindAbsenceDto) {
    return await this.findMany({
      where: findManyOptions,
      relations: ['gmp', 'turn'],
    });
  }

  async findOne(
    findOneOptions: FindOneOptions<Absence>,
    found: boolean = true,
  ) {
    const absenceFound = await this.absencesService.findOne(findOneOptions);
    if (found && !absenceFound) absenceNotFoundError();
    else if (!found && absenceFound) absenceFoundError();
    else {
      absenceFound.startDate = new Date(moment(absenceFound.startDate).subtract(3, 'hour').format(this.dateFormat));
      absenceFound.endDate = new Date(moment(absenceFound.endDate).subtract(3, 'hour').format(this.dateFormat));
      return absenceFound
    };
  }

  async getAbsence(absenceId: number) {
    return await this.findOne({ where: { id: absenceId } });
  }

  async getAbsenceWithRelations(absenceId: number) {
    return await this.findOne({
      where: { id: absenceId },
      relations: ['gmp', 'turn'],
    });
  }

  async createAbsence(absenceData: CreateAbsenceDto) {
    if (moment(absenceData.startDate).isAfter(absenceData.endDate)) {
      startDateError();
    }
    await this.gmpsProvider.findOne({ where: { id: absenceData.gmpId } });
    await this.turnsProvider.findOne({ where: { id: absenceData.turnId } });
    await this.absencesService.insert(absenceData);
    return true;
  }

  async updateAbsense(absenceId: number, absenceData: UpdateAbsenceDto) {
    const absenceFound = await this.findOne({ where: { id: absenceId } });
    if ('gmpId' in absenceData) {
      await this.gmpsProvider.findOne({ where: { id: absenceData.gmpId } });
    }
    if ('turnId' in absenceData) {
      await this.turnsProvider.findOne({ where: { id: absenceData.turnId } });
    }
    if (
      moment(absenceData?.startDate ?? absenceFound.startDate).isAfter(
        absenceData?.endDate ?? absenceFound.endDate,
      )
    ) {
      invalidDatesError();
    } else {
      if ('startDate' in absenceData) {
        absenceData.startDate = new Date(moment(absenceData.startDate).add(3, 'hour').format(this.dateFormat));
      }
      if ('endDate' in absenceData) {
        absenceData.endDate = new Date(moment(absenceData.endDate).add(3, 'hour').format(this.dateFormat));
      }
    }
    await this.absencesService.update(absenceId, absenceData);
    return true;
  }

  async deleteAbsence(absenceId: number) {
    await this.findOne({ where: { id: absenceId } });
    await this.absencesService.delete(absenceId);
    return true;
  }
}
