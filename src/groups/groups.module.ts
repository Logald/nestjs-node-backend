import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Turn } from 'src/turns/turn.entity';
import { Group } from './group.entity';
import { GroupsController } from './groups.controller';
import { GroupsProvider } from './groups.service';

@Module({
  imports: [TypeOrmModule.forFeature([Group, Turn])],
  controllers: [GroupsController],
  providers: [GroupsProvider],
})
export class GroupsModule {}
