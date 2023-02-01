import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeopleProvider } from 'src/people/people.service';
import { Person } from 'src/people/person.entity';
import { Proffessor } from './proffessor.entity';
import { ProffessorsController } from './proffessors.controller';
import { ProffessorsResolver } from './proffessors.resolver';
import { ProffessorsProvider } from './proffessors.service';

@Module({
  imports: [TypeOrmModule.forFeature([Proffessor, Person])],
  controllers: [ProffessorsController],
  providers: [ProffessorsProvider, PeopleProvider, ProffessorsResolver]
})
export class ProffessorsModule { }
