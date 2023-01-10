import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards
} from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger'
import { AccessTokenGuard } from 'src/users/accessTokenGuard'
import { CreatePeopleDto } from './dtos/create_people.dto'
import { FindPeopleDto } from './dtos/find_people.dto'
import { UpdatePeopleDto } from './dtos/update_people.dto'
import { PeopleProvider } from './people.service'

@ApiTags('people')
@Controller('people')
export class PeopleController {
  constructor (private readonly peopleProvider: PeopleProvider) {}
  @ApiBody({
    type: FindPeopleDto
  })
  @Post()
  async getPeople (@Body() personData: FindPeopleDto) {
    return await this.peopleProvider.getPeople(personData)
  }

  @Post('/create')
  async createPerson (@Body() personData: CreatePeopleDto) {
    return await this.peopleProvider.createPerson(personData)
  }

  @Get('/:id')
  async getPerson (@Param('id', ParseIntPipe) personId: number) {
    return await this.peopleProvider.getPerson(personId)
  }

  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @Patch('/:id')
  async updatePerson (
  @Param('id', ParseIntPipe) personId: number,
    @Body() personData: UpdatePeopleDto
  ) {
    return await this.peopleProvider.updatePerson(personId, personData)
  }

  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @Delete('/:id')
  async deletePersone (@Param('id', ParseIntPipe) personId: number) {
    return await this.peopleProvider.deletePerson(personId)
  }
}
