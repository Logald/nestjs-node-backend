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
}
