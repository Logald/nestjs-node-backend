import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { z } from 'zod';
import { PeopleProvider } from './people.service';
import { Person } from './person.entity';
import { CreatePeople } from './schemas/create_people.schema';
import { UpdatePeople } from './schemas/update_people.schema';

@Controller('people')
export class PeopleController {
  constructor(private peopleProvider: PeopleProvider) {}

  @Post()
  getPeople(@Body() personData: Person) {
    return this.peopleProvider.getPeople(personData);
  }

  @Post('/create')
  createPerson(@Body() personData: z.infer<typeof CreatePeople>) {
    return this.peopleProvider.createPerson(personData);
  }

  @Get('/:id')
  getPerson(@Param('id') personId: number) {
    return this.peopleProvider.getPerson(personId);
  }

  @Patch('/:id')
  updatePerson(
    @Param('id') personId: number,
    @Body() personData: z.infer<typeof UpdatePeople>,
  ) {
    return this.peopleProvider.updatePerson(personId, personData);
  }

  @Delete('/:id')
  deletePersone(@Param('id') personId: number) {
    return this.peopleProvider.deletePerson(personId);
  }
}
