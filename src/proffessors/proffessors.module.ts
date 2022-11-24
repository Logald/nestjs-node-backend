import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from 'src/people/person.entity';
import { Proffessor } from './proffessor.entity';
import { ProffessorsController } from './proffessors.controller';
import { ProffessorsProvider } from './proffessors.service';

@Module({
  imports: [TypeOrmModule.forFeature([Proffessor, Person])],
  controllers: [ProffessorsController],
  providers: [ProffessorsProvider],
})
export class ProffessorsModule {}
