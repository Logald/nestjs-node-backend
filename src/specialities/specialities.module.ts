import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Matter } from 'src/matters/matter.entity';
import { Proffessor } from 'src/proffessors/proffessor.entity';
import { SpecialitiesController } from './specialities.controller';
import { SpecialitiesProvider } from './specialities.service';
import { Speciality } from './speciality.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Speciality, Matter, Proffessor])],
  controllers: [SpecialitiesController],
  providers: [SpecialitiesProvider],
})
export class SpecialitiesModule {}
