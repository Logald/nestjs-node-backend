import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { Proffessor } from './proffessor.entity';
import { ProffessorsProvider } from './proffessors.service';

@Controller('proffessors')
export class ProffessorsController {
  constructor(private proffessorsProvider: ProffessorsProvider) {}

  @Get()
  getProffessors() {
    return this.proffessorsProvider.getProffessors();
  }

  @Get('/person')
  getProffessorsWithPerson() {
    return this.proffessorsProvider.getProffessorsWithPerson();
  }

  @Get('/:id')
  getProffessor(@Param('id') proffessorId: number) {
    return this.proffessorsProvider.getProffessor(proffessorId);
  }

  @Get('/:id/person')
  getProffessorWithPerson(@Param('id') proffessorId: number) {
    return this.proffessorsProvider.getProffessorWithPerson(proffessorId);
  }

  @Post()
  createProffessor(@Body() proffessorData: Omit<Proffessor, 'id'>) {
    return this.proffessorsProvider.createProffessor(proffessorData);
  }

  @Patch('/:id')
  updateProffessor(
    @Param('id') proffessorId: number,
    @Body() proffessorData: Partial<Omit<Proffessor, 'id'>>,
  ) {
    return this.proffessorsProvider.updateProffessor(
      proffessorId,
      proffessorData,
    );
  }
}
