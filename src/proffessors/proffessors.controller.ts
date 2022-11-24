import { Body, Controller, Get, Post } from '@nestjs/common';
import { Proffessor } from './proffessor.entity';
import { ProffessorsProvider } from './proffessors.service';

@Controller('proffessors')
export class ProffessorsController {
  constructor(private proffessorsProvider: ProffessorsProvider) {}

  @Get()
  getProffessors() {
    return this.proffessorsProvider.getProffessors();
  }

  @Post()
  createProffessor(@Body() proffessorData: Omit<Proffessor, 'id'>) {
    return this.proffessorsProvider.createProffessor(proffessorData);
  }
}
