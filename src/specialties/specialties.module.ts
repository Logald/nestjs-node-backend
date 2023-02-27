import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Matter } from 'src/matters/matter.entity';
import { MattersProvider } from 'src/matters/matters.service';
import { Proffessor } from 'src/proffessors/proffessor.entity';
import { ProffessorsProvider } from 'src/proffessors/proffessors.service';
import { SpecialitiesController } from './specialties.controller';
import { SpecialtiesResolver } from './specialties.resolver';
import { SpecialtiesProvider } from './specialties.service';
import { Specialty } from './specialty.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Specialty, Matter, Proffessor])],
  controllers: [SpecialitiesController],
  providers: [SpecialtiesProvider, MattersProvider, ProffessorsProvider, SpecialtiesResolver]
})
export class SpecialtiesModule { }
