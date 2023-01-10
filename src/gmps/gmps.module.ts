import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Group } from 'src/groups/group.entity'
import { GroupsProvider } from 'src/groups/groups.service'
import { Matter } from 'src/matters/matter.entity'
import { MattersProvider } from 'src/matters/matters.service'
import { MG } from 'src/mgs/mg.entity'
import { MGProvider } from 'src/mgs/mgs.service'
import { PeopleProvider } from 'src/people/people.service'
import { Person } from 'src/people/person.entity'
import { Proffessor } from 'src/proffessors/proffessor.entity'
import { ProffessorsProvider } from 'src/proffessors/proffessors.service'
import { Turn } from 'src/turns/turn.entity'
import { TurnsProvider } from 'src/turns/turns.service'
import { Gmp } from './gmp.entity'
import { GmpsController } from './gmps.controller'
import { GmpsProvider } from './gmps.service'

@Module({
  imports: [TypeOrmModule.forFeature([Gmp, MG, Proffessor, Matter, Group, Person, Turn])],
  controllers: [GmpsController],
  providers: [GmpsProvider, MGProvider, ProffessorsProvider, MattersProvider, GroupsProvider, PeopleProvider,
    TurnsProvider]
})
export class GmpsModule {}
