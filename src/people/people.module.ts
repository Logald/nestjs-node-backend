import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeopleController } from './people.controller';
import { PeopleProvider } from './people.service';
import { Person } from './person.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Person])],
  controllers: [PeopleController],
  providers: [PeopleProvider],
})
export class PeopleModule {}
