import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Group } from 'src/groups/group.entity'
import { GroupsProvider } from 'src/groups/groups.service'
import { Matter } from 'src/matters/matter.entity'
import { MattersProvider } from 'src/matters/matters.service'
import { Turn } from 'src/turns/turn.entity'
import { TurnsProvider } from 'src/turns/turns.service'
import { MG } from './mg.entity'
import { MGController } from './mgs.controller'
import { MGProvider } from './mgs.service'

@Module({
  imports: [TypeOrmModule.forFeature([MG, Matter, Group, Turn])],
  controllers: [MGController],
  providers: [MGProvider, MattersProvider, GroupsProvider, TurnsProvider]
})
export class MGModule {}
