import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from 'src/people/person.entity';
import { Repository } from 'typeorm';
import { Proffessor } from './proffessor.entity';

@Injectable()
export class ProffessorsProvider {
  constructor(
    @InjectRepository(Proffessor)
    private proffessorsService: Repository<Proffessor>,
    @InjectRepository(Person) private peopleService: Repository<Person>,
  ) {}

  async getProffessors() {
    return await this.proffessorsService.find();
  }

  async getProffessorsWithPerson() {
    return await this.proffessorsService.find({ relations: ['person'] });
  }

  async getProffessor(proffessorId: number) {
    const proffessorFound = await this.proffessorsService.findOne({
      where: { id: proffessorId },
    });
    if (!proffessorFound)
      return new HttpException('Proffessor not found', HttpStatus.NOT_FOUND);
    return proffessorFound;
  }

  async createProffessor(proffessorData: Omit<Proffessor, 'id'>) {
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
    const tempProffessor = this.proffessorsService.create(proffessorData);
    return await this.proffessorsService.save(tempProffessor);
  }

  async updateProffessor(
    proffessorId: number,
    proffessorData: Partial<Omit<Proffessor, 'id'>>,
  ) {
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
}
