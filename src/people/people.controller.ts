import { Body, Controller, Post } from '@nestjs/common';
import { PeopleProvider } from './people.service';
import { Person } from './person.entity';

@Controller('people')
export class PeopleController {
  constructor(private peopleProvider: PeopleProvider) {}

  @Post()
  createPerson(@Body() personData: Omit<Person, 'id'>) {
    return this.peopleProvider.createPerson(personData);
  }
}
