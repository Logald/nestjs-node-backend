import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Matter } from 'src/matters/matter.entity';
import { MattersProvider } from 'src/matters/matters.service';
import { PeopleProvider } from 'src/people/people.service';
import { Person } from 'src/people/person.entity';
import { Proffessor } from 'src/proffessors/proffessor.entity';
import { ProffessorsProvider } from 'src/proffessors/proffessors.service';
import { SpecialitiesController } from './specialties.controller';
import { SpecialtiesResolver } from './specialties.resolver';
import { SpecialtiesProvider } from './specialties.service';
import { Specialty } from './specialty.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Specialty, Matter, Proffessor, Person])],
  controllers: [SpecialitiesController],
  providers: [SpecialtiesProvider, MattersProvider, ProffessorsProvider, PeopleProvider, SpecialtiesResolver]
})
export class SpecialtiesModule { }
