import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as moment from 'moment'
import { Gmp } from 'src/gmps/gmp.entity'
import { Turn } from 'src/turns/turn.entity'
import {
  FindManyOptions,
  FindOneOptions,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository
} from 'typeorm'
import { z } from 'zod'
import { Absence } from './abcense.entity'
import { CreateAbsence } from './schemas/create_absence.schema'
import { UpdateAbsence } from './schemas/update_absence.schema'

@Injectable()
export class AbsencesProvider {
  private readonly dateFormat = 'YYYY-MM-DD HH:mm:ss.SSS'
  constructor (
    @InjectRepository(Absence) private readonly absencesService: Repository<Absence>,
    @InjectRepository(Gmp) private readonly gmpsService: Repository<Gmp>,
    @InjectRepository(Turn) private readonly turnsService: Repository<Turn>
  ) {
    setInterval(() => {
      this.absencesService
        .createQueryBuilder()
        .update()
        .set({ active: false })
        .where('endDate < :endDate and active = true', { endDate: new Date() })
        .execute()
    }, 10000)
  }

  private async findMany (findManyOptions: FindManyOptions) {
    const options: any = findManyOptions.where
    if ('startDate' in options) { options.startDate = MoreThanOrEqual(new Date(options.startDate)) }
    if ('endDate' in options) { options.endDate = LessThanOrEqual(new Date(options.endDate)) }
    findManyOptions.where = options
    return await this.absencesService.find(findManyOptions)
  }

  async getAbsences (findManyOptions: Absence) {
    return await this.findMany({
      where: findManyOptions
    })
  }

  async getAbsencesWithRelations (findManyOptions: Absence) {
    return await this.findMany({
      where: findManyOptions,
      relations: ['gmp', 'turn']
    })
  }

  private async findOne (absenceId: number, options: FindOneOptions) {
    const foundAbsence = await this.absencesService.findOne(options)
    if (!foundAbsence) { throw new HttpException('Absence not found', HttpStatus.NOT_FOUND) }
    return foundAbsence
  }

  async getAbsence (absenceId: number) {
    return await this.findOne(absenceId, { where: { id: absenceId } })
  }

  async getAbsenceWithRelations (absenceId: number) {
    return await this.findOne(absenceId, {
      where: { id: absenceId },
      relations: ['gmp', 'turn']
    })
  }

  async createAbsence (absenceData: z.infer<typeof CreateAbsence>) {
    absenceData.startDate = moment(absenceData.startDate, this.dateFormat)
      .utc(true)
      .format()
    absenceData.endDate = moment(absenceData.endDate, this.dateFormat)
      .utc(true)
      .format()
    const passFormat = CreateAbsence.safeParse(absenceData)
    if (!passFormat.success) { throw new HttpException('Invalid format', HttpStatus.NOT_ACCEPTABLE) }
    absenceData = passFormat.data
    if (moment(absenceData.startDate).isAfter(absenceData.endDate)) {
      throw new HttpException(
        'StartDate cannot be greater than EndDate',
        HttpStatus.NOT_ACCEPTABLE
      )
    }
    const gmpFound = await this.gmpsService.findOne({
      where: { id: absenceData.gmpId }
    })
    if (!gmpFound) { throw new HttpException('Gmp not found', HttpStatus.NOT_ACCEPTABLE) }
    const turnFound = await this.turnsService.findOne({
      where: { id: absenceData.turnId }
    })
    if (!turnFound) { throw new HttpException('Turn not found', HttpStatus.NOT_ACCEPTABLE) }
    return await this.absencesService.insert(absenceData)
  }

  async updateAbsense (
    absenceId: number,
    absenceData: z.infer<typeof UpdateAbsence>
  ) {
    if (absenceData?.startDate) {
      absenceData.startDate = moment(absenceData.startDate, this.dateFormat)
        .utc(true)
        .format()
    }
    if (absenceData?.endDate) {
      absenceData.endDate = moment(absenceData.endDate, this.dateFormat)
        .utc(true)
        .format()
    }
    const passFormat = UpdateAbsence.safeParse(absenceData)
    if (!passFormat.success) { throw new HttpException('Invalid format', HttpStatus.NOT_ACCEPTABLE) }
    absenceData = passFormat.data
    const absenceFound = await this.absencesService.findOne({
      where: { id: absenceId }
    })
    if (!absenceFound) { throw new HttpException('Absence not found', HttpStatus.NOT_FOUND) }
    if ('gmpId' in absenceData) {
      const gmpFound = await this.gmpsService.findOne({
        where: { id: absenceData.gmpId }
      })
      if (!gmpFound) { throw new HttpException('Gmp not found', HttpStatus.NOT_ACCEPTABLE) }
    }
    if ('turnId' in absenceData) {
      const turnFound = await this.turnsService.findOne({
        where: { id: absenceData.turnId }
      })
      if (!turnFound) { throw new HttpException('Turn not found', HttpStatus.NOT_ACCEPTABLE) }
    }
    if (
      moment(absenceData?.startDate ?? absenceFound.startDate).isAfter(
        absenceData?.endDate ?? absenceFound.endDate
      )
    ) { throw new HttpException('Invalid dates', HttpStatus.NOT_ACCEPTABLE) }
    return await this.absencesService.update(absenceId, absenceData)
  }

  async deleteAbsence (absenceId: number) {
    const absenceFound = await this.absencesService.delete(absenceId)
    if (absenceFound.affected == 0) { throw new HttpException('Absence not found', HttpStatus.NOT_FOUND) }
    return absenceFound
  }
}
