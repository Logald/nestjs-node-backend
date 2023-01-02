import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Matter } from 'src/matters/matter.entity';
import { Proffessor } from 'src/proffessors/proffessor.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { z } from 'zod';
import { CreateSpecialty } from './schemas/create_specialty.schema';
import { UpdateSpecialty } from './schemas/update_specialty.schema';
import { Specialty } from './specialty.entity';

@Injectable()
export class SpecialitiesProvider {
  constructor(
    @InjectRepository(Specialty)
    private specialitiesService: Repository<Specialty>,
    @InjectRepository(Matter) private mattersService: Repository<Matter>,
    @InjectRepository(Proffessor)
    private proffessorsService: Repository<Proffessor>,
  ) {}

  async getSpecialities(findManyOptions: Specialty) {
    return await this.specialitiesService.find({ where: findManyOptions });
  }

  async getSpecialitiesWithRelations(findManyOptions: Specialty) {
    return await this.specialitiesService.find({
      where: findManyOptions,
      relations: ['matter', 'proffessor'],
    });
  }

  async findSpecialty(findOptions: FindOneOptions) {
    const specialtyFound = await this.specialitiesService.findOne(findOptions);
    if (!specialtyFound)
      return new HttpException('specialty not found', HttpStatus.NOT_FOUND);
    return specialtyFound;
  }

  async getSpecialty(specialtyId: number) {
    return await this.findSpecialty({
      where: { id: specialtyId },
    });
  }

  async getSpecialtyWithRelations(specialtyId: number) {
    return await this.findSpecialty({
      where: { id: specialtyId },
      relations: ['matter', 'proffessor'],
    });
  }

  async createSpecialty(specialtyData: z.infer<typeof CreateSpecialty>) {
    const passFormat = CreateSpecialty.safeParse(specialtyData);
    if (!passFormat.success)
      return new HttpException('Invalid Format', HttpStatus.NOT_ACCEPTABLE);
    specialtyData = passFormat.data;
    const specialtyFound = await this.specialitiesService.findOne({
      where: {
        matterId: specialtyData.matterId,
        proffessorId: specialtyData.proffessorId,
      },
    });
    if (specialtyFound)
      return new HttpException('specialty found', HttpStatus.FOUND);
    const matterFound = await this.mattersService.findOne({
      where: { id: specialtyData.matterId },
    });
    if (!matterFound)
      return new HttpException('Matter not found', HttpStatus.NOT_ACCEPTABLE);
    const proffessorFound = await this.proffessorsService.findOne({
      where: { id: specialtyData.proffessorId },
    });
    if (!proffessorFound)
      return new HttpException(
        'Proffessor not found',
        HttpStatus.NOT_ACCEPTABLE,
      );
    const newSpecialty = await this.specialitiesService.insert(specialtyData);
    return newSpecialty;
  }

  async updateSpecialty(
    specialtyId: number,
    specialtyData: Partial<Omit<Specialty, 'id'>>,
  ) {
    const passFormat = UpdateSpecialty.safeParse(specialtyData);
    if (!passFormat.success)
      return new HttpException('Invalid Format', HttpStatus.NOT_ACCEPTABLE);
    if (Object.keys(passFormat.data).length == 0)
      return new HttpException('Empty object', HttpStatus.NOT_ACCEPTABLE);
    specialtyData = passFormat.data;
    if ('matterId' in specialtyData) {
      const matterFound = await this.mattersService.findOne({
        where: { id: specialtyData.matterId },
      });
      if (!matterFound)
        return new HttpException('Matter not found', HttpStatus.NOT_ACCEPTABLE);
    }
    if ('proffessorId' in specialtyData) {
      const proffessorFound = await this.proffessorsService.findOne({
        where: { id: specialtyData.proffessorId },
      });
      if (!proffessorFound)
        return new HttpException(
          'Proffessor not found',
          HttpStatus.NOT_ACCEPTABLE,
        );
    }
    return await this.specialitiesService
      .update(specialtyId, specialtyData)
      .then((updateResult) => {
        if (updateResult.affected == 0)
          return new HttpException('specialty not found', HttpStatus.NOT_FOUND);
        return updateResult;
      })
      .catch(() => new HttpException('Specialty found', HttpStatus.FOUND));
  }

  async deletespecialty(specialtyId: number) {
    const specialtyFound = await this.specialitiesService.delete(specialtyId);
    if (specialtyFound.affected == 0)
      return new HttpException('specialty not found', HttpStatus.NOT_FOUND);
    return specialtyFound;
  }
}
