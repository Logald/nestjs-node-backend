import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Matter } from 'src/matters/matter.entity';
import { Proffessor } from 'src/proffessors/proffessor.entity';
import { Repository } from 'typeorm';
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

  async getSpecialitiesWithProffessor() {
    return await this.specialitiesService.find({ relations: ['proffessor'] });
  }

  async getSpeciality(specialityId: number) {
    const specialityFound = await this.specialitiesService.findOne({
      where: { id: specialityId },
    });
    if (!specialityFound)
      return new HttpException('Speciality not found', HttpStatus.NOT_FOUND);
    return specialityFound;
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
}
