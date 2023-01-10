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
import { ApiTags } from '@nestjs/swagger'
import { AccessTokenGuard } from 'src/users/accessTokenGuard'
import { CreateProffessorDto } from './dtos/create_proffessor.dto'
import { FindProffessorDto } from './dtos/find_proffessor.dto'
import { UpdateProffessorDto } from './dtos/update_proffessor.dto'
import { ProffessorsProvider } from './proffessors.service'

@UseGuards(AccessTokenGuard)
@ApiTags('proffessors')
@Controller('proffessors')
export class ProffessorsController {
  constructor (private readonly proffessorsProvider: ProffessorsProvider) {}

  @Post()
  async getProffessors (@Body() proffessorData: FindProffessorDto) {
    return await this.proffessorsProvider.getProffessors(proffessorData)
  }

  @Post('/all')
  async getProffessorsWithRelations (@Body() proffessorData: FindProffessorDto) {
    return await this.proffessorsProvider.getProffessorsWithRelations(proffessorData)
  }

  @Post('/create')
  async createProffessor (@Body() proffessorData: CreateProffessorDto) {
    return await this.proffessorsProvider.createProffessor(proffessorData)
  }

  @Get('/:id')
  async getProffessor (@Param('id', ParseIntPipe) proffessorId: number) {
    return await this.proffessorsProvider.getProffessor(proffessorId)
  }

  @Get('/:id/all')
  async getProffessorWithPerson (@Param('id', ParseIntPipe) proffessorId: number) {
    return await this.proffessorsProvider.getProffessorWithRelations(proffessorId)
  }

  @Patch('/:id')
  async updateProffessor (
  @Param('id', ParseIntPipe) proffessorId: number,
    @Body() proffessorData: UpdateProffessorDto
  ) {
    return await this.proffessorsProvider.updateProffessor(
      proffessorId,
      proffessorData
    )
  }

  @Delete('/:id')
  async deleteProffessor (@Param('id', ParseIntPipe) proffessorId: number) {
    return await this.proffessorsProvider.deleteProffessor(proffessorId)
  }
}
