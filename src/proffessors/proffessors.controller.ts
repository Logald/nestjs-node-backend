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
import { Proffessor } from './proffessor.entity'
import { ProffessorsProvider } from './proffessors.service'
import { CreateProffessor } from './schemas/create_proffessor.schema'
import { UpdateProffessor } from './schemas/update_proffessor.schema'

@UseGuards(AccessTokenGuard)
@Controller('proffessors')
export class ProffessorsController {
  constructor (private readonly proffessorsProvider: ProffessorsProvider) {}

  @Post()
  async getProffessors (@Body() proffessorData: Proffessor) {
    return await this.proffessorsProvider.getProffessors(proffessorData)
  }

  @Post('/all')
  async getProffessorsWithRelations (@Body() proffessorData: Proffessor) {
    return await this.proffessorsProvider.getProffessorsWithRelations(proffessorData)
  }

  @Post('/create')
  async createProffessor (@Body() proffessorData: z.infer<typeof CreateProffessor>) {
    return await this.proffessorsProvider.createProffessor(proffessorData)
  }

  @Get('/:id')
  async getProffessor (@Param('id') proffessorId: number) {
    return await this.proffessorsProvider.getProffessor(proffessorId)
  }

  @Get('/:id/all')
  async getProffessorWithPerson (@Param('id') proffessorId: number) {
    return await this.proffessorsProvider.getProffessorWithRelations(proffessorId)
  }

  @Patch('/:id')
  async updateProffessor (
  @Param('id') proffessorId: number,
    @Body() proffessorData: z.infer<typeof UpdateProffessor>
  ) {
    return await this.proffessorsProvider.updateProffessor(
      proffessorId,
      proffessorData
    )
  }

  @Delete('/:id')
  async deleteProffessor (@Param('id') proffessorId: number) {
    return await this.proffessorsProvider.deleteProffessor(proffessorId)
  }
}
