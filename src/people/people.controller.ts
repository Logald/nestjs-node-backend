import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards
} from '@nestjs/common'
import { AccessTokenGuard } from 'src/users/accessTokenGuard'
import { z } from 'zod'
import { PeopleProvider } from './people.service'
import { Person } from './person.entity'
import { CreatePeople } from './schemas/create_people.schema'
import { UpdatePeople } from './schemas/update_people.schema'

@Controller('people')
export class PeopleController {
  constructor (private readonly peopleProvider: PeopleProvider) {}

  @Post()
  async getPeople (@Body() personData: Person) {
    return await this.peopleProvider.getPeople(personData)
  }

  @Post('/create')
  async createPerson (@Body() personData: z.infer<typeof CreatePeople>) {
    return await this.peopleProvider.createPerson(personData)
  }

  @Get('/:id')
  async getPerson (@Param('id') personId: number) {
    return await this.peopleProvider.getPerson(personId)
  }

  @UseGuards(AccessTokenGuard)
  @Patch('/:id')
  async updatePerson (
  @Param('id') personId: number,
    @Body() personData: z.infer<typeof UpdatePeople>
  ) {
    return await this.peopleProvider.updatePerson(personId, personData)
  }

  @UseGuards(AccessTokenGuard)
  @Delete('/:id')
  async deletePersone (@Param('id') personId: number) {
    return await this.peopleProvider.deletePerson(personId)
  }
}
