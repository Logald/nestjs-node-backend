import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Turn } from 'src/turns/turn.entity'
import { TurnsProvider } from 'src/turns/turns.service'
import { Group } from './group.entity'
import { GroupsController } from './groups.controller'
import { GroupsProvider } from './groups.service'

@Module({
  imports: [TypeOrmModule.forFeature([Group, Turn])],
  controllers: [GroupsController],
  providers: [GroupsProvider, TurnsProvider]
})
export class GroupsModule {}
