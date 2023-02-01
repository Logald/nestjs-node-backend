import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Turn } from 'src/turns/turn.entity';
import { TurnsProvider } from 'src/turns/turns.service';
import { Group } from './group.entity';
import { GroupsController } from './groups.controller';
import { GroupsResolver } from './groups.resolver';
import { GroupsProvider } from './groups.service';

@Module({
  imports: [TypeOrmModule.forFeature([Group, Turn])],
  controllers: [GroupsController],
  providers: [GroupsProvider, TurnsProvider, GroupsResolver]
})
export class GroupsModule { }
