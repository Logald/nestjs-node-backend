import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from 'src/people/person.entity';
import { FindOneOptions, Repository } from 'typeorm';
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

  async getActiveProffessors() {
    return await this.proffessorsService.find({ where: { active: true } });
  }

  async getInactiveProffessors() {
    return await this.proffessorsService.find({ where: { active: false } });
  }

  async getInactiveProffessorsWithPerson() {
    return await this.proffessorsService.find({
      where: { active: false },
      relations: ['person'],
    });
  }

  async getProffessorsWithPerson() {
    return await this.proffessorsService.find({ relations: ['person'] });
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

  async getProffessorByPersonId(personId: number) {
    const proffessorFound = await this.proffessorsService.findOne({
      where: { personId },
    });
    if (!proffessorFound)
      return new HttpException('Proffessor not found', HttpStatus.NOT_FOUND);
    return proffessorFound;
  }

  async getProffessorWithPerson(proffessorId: number) {
    return await this.findProffessor({
      where: { id: proffessorId },
      relations: ['person'],
    });
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
