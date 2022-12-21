import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from 'src/people/person.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { z } from 'zod';
import { Proffessor } from './proffessor.entity';
import { CreateProffessor } from './schemas/create_proffessor.schema';
import { UpdateProffessor } from './schemas/update_proffessor.schema';

@Injectable()
export class ProffessorsProvider {
  constructor(
    @InjectRepository(Proffessor)
    private proffessorsService: Repository<Proffessor>,
    @InjectRepository(Person) private peopleService: Repository<Person>,
  ) {}

  async getProffessors(findManyOptions: Proffessor) {
    return await this.proffessorsService.find({ where: findManyOptions });
  }

  async getProffessorsWithRelations(findManyOptions: Proffessor) {
    return await this.proffessorsService.find({
      where: findManyOptions,
      relations: ['person'],
    });
  }

  private async findProffessor(findOptions: FindOneOptions) {
    const proffessorFound = await this.proffessorsService.findOne(findOptions);
    if (!proffessorFound)
      return new HttpException('Proffessor not found', HttpStatus.NOT_FOUND);
    return proffessorFound;
  }

  async getProffessor(proffessorId: number) {
    return await this.findProffessor({
      where: { id: proffessorId },
    });
  }

  async getProffessorWithRelations(proffessorId: number) {
    return await this.findProffessor({
      where: { id: proffessorId },
      relations: ['person'],
    });
  }

  async createProffessor(proffessorData: z.infer<typeof CreateProffessor>) {
    const passFormat = CreateProffessor.safeParse(proffessorData);
    if (!passFormat.success)
      return new HttpException('Invalid format', HttpStatus.NOT_ACCEPTABLE);
    proffessorData = passFormat.data;
    const personFound = await this.peopleService.findOne({
      where: { id: proffessorData.personId },
    });
    if (!personFound)
      return new HttpException('Person not found', HttpStatus.NOT_ACCEPTABLE);
    const proffessorFound = await this.proffessorsService.findOne({
      where: { personId: proffessorData.personId },
    });
    if (proffessorFound)
      return new HttpException('Person found', HttpStatus.NOT_ACCEPTABLE);
    return await this.proffessorsService.insert(proffessorData);
  }

  async updateProffessor(
    proffessorId: number,
    proffessorData: z.infer<typeof UpdateProffessor>,
  ) {
    const passFormat = UpdateProffessor.safeParse(proffessorData);
    if (!passFormat.success)
      return new HttpException('Invalid format', HttpStatus.NOT_ACCEPTABLE);
    if (Object.keys(passFormat.data).length == 0)
      return new HttpException('Empty object', HttpStatus.NOT_ACCEPTABLE);
    proffessorData = passFormat.data;
    if ('personId' in proffessorData) {
      const personFound = await this.peopleService.findOne({
        where: { id: proffessorData.personId },
      });
      if (!personFound)
        return new HttpException('Person not found', HttpStatus.NOT_ACCEPTABLE);
    }
    const proffessorFound = await this.proffessorsService.update(
      proffessorId,
      proffessorData,
    );
    if (proffessorFound.affected == 0)
      return new HttpException(
        'Proffessor not found',
        HttpStatus.NOT_ACCEPTABLE,
      );
    return proffessorData;
  }

  async deleteProffessor(proffessorId: number) {
    const proffessorFound = await this.proffessorsService.delete(proffessorId);
    if (proffessorFound.affected == 0)
      return new HttpException('Proffessor not found', HttpStatus.NOT_FOUND);
    return proffessorFound;
  }
}
