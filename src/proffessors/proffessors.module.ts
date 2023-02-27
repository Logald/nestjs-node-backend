import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proffessor } from './proffessor.entity';
import { ProffessorsController } from './proffessors.controller';
import { ProffessorsResolver } from './proffessors.resolver';
import { ProffessorsProvider } from './proffessors.service';

@Module({
  imports: [TypeOrmModule.forFeature([Proffessor])],
  controllers: [ProffessorsController],
  providers: [ProffessorsProvider, ProffessorsResolver]
})
export class ProffessorsModule { }
