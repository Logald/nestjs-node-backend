import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Matter } from 'src/matters/matter.entity';
import { MattersProvider } from 'src/matters/matters.service';
import { Proffessor } from 'src/proffessors/proffessor.entity';
import { ProffessorsProvider } from 'src/proffessors/proffessors.service';
import { isEmpty } from 'src/utils/empty_object.utils';
import {
  specialtyFoundError,
  specialtyNotFoundError,
} from 'src/utils/errors.utils';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateSpecialtyDto } from './dtos/create_specialty.dto';
import { FindSpecialtyDto } from './dtos/find_specialty.dto';
import { UpdateSpecialtyDto } from './dtos/update_specialty.dto';
import { Specialty } from './specialty.entity';

@Injectable()
export class SpecialtiesProvider {
  constructor(
    @InjectRepository(Specialty)
    private readonly specialtiesService: Repository<Specialty>,
    @InjectRepository(Matter) private readonly mattersService: Repository<Matter>,
    @InjectRepository(Proffessor)
    private readonly proffessorsService: Repository<Proffessor>,
    private readonly mattersProvider: MattersProvider,
    private readonly proffessorsProvider: ProffessorsProvider,
  ) { }

  async getSpecialties(findManyOptions: FindSpecialtyDto) {
    return await this.specialtiesService.find({ where: findManyOptions });
  }

  async getSpecialtiesWithRelations(findManyOptions: FindSpecialtyDto) {
    return await this.specialtiesService.find({
      where: findManyOptions,
      relations: ['matter', 'proffessor'],
    });
  }

  async findOne(
    findOneOptions: FindOneOptions<Specialty>,
    found: boolean = true,
  ) {
    const specialtyFound = await this.specialtiesService.findOne(
      findOneOptions,
    );
    if (found && !specialtyFound) specialtyNotFoundError();
    else if (!found && specialtyFound) specialtyFoundError();
    else return specialtyFound;
  }

  async getSpecialty(specialtyId: number) {
    return await this.findOne({ where: { id: specialtyId } });
  }

  async getSpecialtyWithRelations(specialtyId: number) {
    return await this.findOne({
      where: { id: specialtyId },
      relations: ['matter', 'proffessor'],
    });
  }

  async createSpecialty(specialtyData: CreateSpecialtyDto) {
    await this.findOne(
      {
        where: {
          matterId: specialtyData.matterId,
          proffessorId: specialtyData.proffessorId,
        },
      },
      false,
    );
    await this.mattersProvider.findOne({
      where: { id: specialtyData.matterId },
    });
    await this.proffessorsProvider.findOne({
      where: { id: specialtyData.proffessorId },
    });
    await this.specialtiesService.insert(specialtyData);
    return true;
  }

  async updateSpecialty(
    specialtyId: number,
    specialtyData: UpdateSpecialtyDto,
  ) {
    isEmpty(specialtyData);
    await this.findOne({ where: { id: specialtyId } });
    if ('matterId' in specialtyData) {
      await this.mattersProvider.findOne({
        where: { id: specialtyData.matterId },
      });
    }
    if ('proffessorId' in specialtyData) {
      await this.proffessorsProvider.findOne({
        where: { id: specialtyData.proffessorId },
      });
    }
    await this.specialtiesService
      .update(specialtyId, specialtyData)
      .catch(() => {
        specialtyFoundError();
      });
    return true;
  }

  async deletespecialty(specialtyId: number) {
    await this.findOne({ where: { id: specialtyId } });
    await this.specialtiesService.delete(specialtyId);
    return true;
  }
}
