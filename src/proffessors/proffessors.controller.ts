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
import { Proffessor } from './proffessor.entity';
import { ProffessorsProvider } from './proffessors.service';
import { CreateProffessor } from './schemas/create_proffessor.schema';
import { UpdateProffessor } from './schemas/update_proffessor.schema';

@Controller('proffessors')
export class ProffessorsController {
  constructor(private proffessorsProvider: ProffessorsProvider) {}

  @Post()
  getProffessors(@Body() proffessorData: Proffessor) {
    return this.proffessorsProvider.getProffessors(proffessorData);
  }

  @Post('/create')
  createProffessor(@Body() proffessorData: z.infer<typeof CreateProffessor>) {
    return this.proffessorsProvider.createProffessor(proffessorData);
  }

  @Get('/:id')
  getProffessor(@Param('id') proffessorId: number) {
    return this.proffessorsProvider.getProffessor(proffessorId);
  }

  @Get('/:id/all')
  getProffessorWithPerson(@Param('id') proffessorId: number) {
    return this.proffessorsProvider.getProffessorWithRelations(proffessorId);
  }

  @Patch('/:id')
  updateProffessor(
    @Param('id') proffessorId: number,
    @Body() proffessorData: z.infer<typeof UpdateProffessor>,
  ) {
    return this.proffessorsProvider.updateProffessor(
      proffessorId,
      proffessorData,
    );
  }

  @Delete('/:id')
  deleteProffessor(@Param('id') proffessorId: number) {
    return this.proffessorsProvider.deleteProffessor(proffessorId);
  }
}
