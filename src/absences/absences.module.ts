import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gmp } from 'src/gmps/gmp.entity';
import { GmpsProvider } from 'src/gmps/gmps.service';
import { Group } from 'src/groups/group.entity';
import { GroupsProvider } from 'src/groups/groups.service';
import { Matter } from 'src/matters/matter.entity';
import { MattersProvider } from 'src/matters/matters.service';
import { MG } from 'src/mgs/mg.entity';
import { MGProvider } from 'src/mgs/mgs.service';
import { Proffessor } from 'src/proffessors/proffessor.entity';
import { ProffessorsProvider } from 'src/proffessors/proffessors.service';
import { Turn } from 'src/turns/turn.entity';
import { TurnsProvider } from 'src/turns/turns.service';
import { Absence } from './abcense.entity';
import { AbsencesController } from './absences.controller';
import { AbsencesResolver } from './absences.resolver';
import { AbsencesProvider } from './absences.service';

@Module({
  imports: [TypeOrmModule.forFeature([Absence, Gmp, Turn, MG, Proffessor, Matter, Group])],
  controllers: [AbsencesController],
  providers: [AbsencesProvider, GmpsProvider, TurnsProvider, MGProvider, ProffessorsProvider, MattersProvider,
    GroupsProvider, AbsencesResolver]
})
export class AbsencesModule { }
