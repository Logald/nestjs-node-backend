import { Body, Controller, Get, Post } from '@nestjs/common';
import { PeopleProvider } from './people.service';
import { Person } from './person.entity';

@Controller('people')
export class PeopleController {
  constructor(private peopleProvider: PeopleProvider) {}

  @Get()
  getPeople() {
    return this.peopleProvider.getPeople();
  }

  @Post()
  createPerson(@Body() personData: Omit<Person, 'id'>) {
    return this.peopleProvider.createPerson(personData);
  }
}
