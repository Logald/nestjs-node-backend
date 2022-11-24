import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Matter } from 'src/matters/matter.entity';
import { Proffessor } from 'src/proffessors/proffessor.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { Speciality } from './speciality.entity';

@Injectable()
export class SpecialitiesProvider {
  constructor(
    @InjectRepository(Speciality)
    private specialitiesService: Repository<Speciality>,
    @InjectRepository(Matter) private mattersService: Repository<Matter>,
    @InjectRepository(Proffessor)
    private proffessorsService: Repository<Proffessor>,
  ) {}

  async getSpecialities() {
    return await this.specialitiesService.find();
  }

  async getSpecialitiesWithMatter() {
    return await this.specialitiesService.find({ relations: ['matter'] });
  }

  async getSpecialitiesWithMatterId(matterId: number) {
    return await this.specialitiesService.find({
      where: { matterId },
    });
  }

  async getSpecialitiesWithMatterIdAndProffessor(matterId: number) {
    return await this.specialitiesService.find({
      relations: ['proffessor'],
      where: { matterId },
    });
  }

  async getSpecialitiesWithMatterIdAndActiveProffessor(matterId: number) {
    return await this.specialitiesService.find({
      relations: ['proffessor'],
      where: { matterId, proffessor: { active: true } },
    });
  }

  async getSpecialitiesWithMatterIdAndInactiveProffessor(matterId: number) {
    return await this.specialitiesService.find({
      relations: ['proffessor'],
      where: { matterId, proffessor: { active: false } },
    });
  }

  async getSpecialitiesWithMatterAndProffessor() {
    return await this.specialitiesService.find({
      relations: ['matter', 'proffessor'],
    });
  }

  async getSpecialitiesWithProffessor() {
    return await this.specialitiesService.find({ relations: ['proffessor'] });
  }

  async getSpecialitiesWithActiveProffessors() {
    return await this.specialitiesService.find({
      relations: ['proffessor'],
      where: { proffessor: { active: true } },
    });
  }

  async getSpecialitiesWithInactiveProffessors() {
    return await this.specialitiesService.find({
      relations: ['proffessor'],
      where: { proffessor: { active: false } },
    });
  }

  async getSpecialitiesWithProffessorId(proffessorId: number) {
    return await this.specialitiesService.find({ where: { proffessorId } });
  }

  async findSpeciality(findOptions: FindOneOptions) {
    const specialityFound = await this.specialitiesService.findOne(findOptions);
    if (!specialityFound)
      return new HttpException('Speciality not found', HttpStatus.NOT_FOUND);
    return specialityFound;
  }

  async getSpeciality(specialityId: number) {
    return await this.findSpeciality({
      where: { id: specialityId },
    });
  }

  async getSpecialityWithMatter(specialityId: number) {
    return await this.findSpeciality({
      where: { id: specialityId },
      relations: ['matter'],
    });
  }

  async getSpecialityWithProffessor(specialityId: number) {
    return await this.findSpeciality({
      where: { id: specialityId },
      relations: ['proffessor'],
    });
  }

  async getSpecialityWithMatterIdAndProffessorId(
    matterId: number,
    proffessorId: number,
  ) {
    return await this.findSpeciality({
      where: { matterId, proffessorId },
    });
  }

  async createSpeciality(specialityData: Omit<Speciality, 'id'>) {
    const specialityFound = await this.specialitiesService.findOne({
      where: {
        matterId: specialityData.matterId,
        proffessorId: specialityData.proffessorId,
      },
    });
    if (specialityFound)
      return new HttpException('Speciality found', HttpStatus.FOUND);
    const matterFound = await this.mattersService.findOne({
      where: { id: specialityData.matterId },
    });
    if (!matterFound)
      return new HttpException('Matter not found', HttpStatus.NOT_ACCEPTABLE);
    const proffessorFound = await this.proffessorsService.findOne({
      where: { id: specialityData.proffessorId },
    });
    if (!proffessorFound)
      return new HttpException(
        'Proffessor not found',
        HttpStatus.NOT_ACCEPTABLE,
      );
    const tempSpeciality = this.specialitiesService.create(specialityData);
    const newSpeciality = await this.specialitiesService.save(tempSpeciality);
    return newSpeciality;
  }

  async updateSpeciality(
    specialityId: number,
    specialityData: Partial<Omit<Speciality, 'id'>>,
  ) {
    if ('matterId' in specialityData) {
      const matterFound = await this.mattersService.findOne({
        where: { id: specialityData.matterId },
      });
      if (!matterFound)
        return new HttpException('Matter not found', HttpStatus.NOT_ACCEPTABLE);
    }
    if ('proffessorId' in specialityData) {
      const proffessorFound = await this.proffessorsService.findOne({
        where: { id: specialityData.proffessorId },
      });
      if (!proffessorFound)
        return new HttpException(
          'Proffessor not found',
          HttpStatus.NOT_ACCEPTABLE,
        );
    }
    const specialityFound = await this.specialitiesService.update(
      specialityId,
      specialityData,
    );
    if (specialityFound.affected == 0)
      return new HttpException('Speciality not found', HttpStatus.NOT_FOUND);
    return specialityFound;
  }

  async deleteSpeciality(specialityId: number) {
    const specialityFound = await this.specialitiesService.delete(specialityId);
    if (specialityFound.affected == 0)
      return new HttpException('Speciality not found', HttpStatus.NOT_FOUND);
    return specialityFound;
  }
}
