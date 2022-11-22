import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from './person.entity';

@Injectable()
export class PeopleProvider {
  constructor(
    @InjectRepository(Person) private peopleService: Repository<Person>,
  ) {}

  async getPeople() {
    return await this.peopleService.find();
  }

  async createPerson(personData: Omit<Person, 'id'>) {
    const personCiMatch = await this.peopleService.findOne({
      where: { ci: personData.ci },
    });
    if (personCiMatch)
      return new HttpException(
        'The ci is already in use',
        HttpStatus.NOT_ACCEPTABLE,
      );
    const tempPerson = this.peopleService.create(personData);
    return await this.peopleService.save(tempPerson);
  }
}
