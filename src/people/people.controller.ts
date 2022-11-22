import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PeopleProvider } from './people.service';
import { Person } from './person.entity';

@Controller('people')
export class PeopleController {
  constructor(private peopleProvider: PeopleProvider) {}

  @Get()
  getPeople() {
    return this.peopleProvider.getPeople();
  }

  @Get('/:id')
  getPerson(@Param('id') personId: number) {
    return this.peopleProvider.getPerson(personId);
  }

  @Post()
  createPerson(@Body() personData: Omit<Person, 'id'>) {
    return this.peopleProvider.createPerson(personData);
  }

  @Patch('/:id')
  updatePerson(
    @Param('id') personId: number,
    @Body() personData: Omit<Person, 'id'>,
  ) {
    return this.peopleProvider.updatePerson(personId, personData);
  }

  @Delete('/:id')
  deletePersone(@Param('id') personId: number) {
    return this.peopleProvider.deletePerson(personId);
  }
}
