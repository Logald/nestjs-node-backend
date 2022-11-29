import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from 'src/groups/group.entity';
import { Matter } from 'src/matters/matter.entity';
import { Proffessor } from 'src/proffessors/proffessor.entity';
import { Gmp } from './gmp.entity';
import { GmpsController } from './gmps.controller';
import { GmpsProvider } from './gmps.service';

@Module({
  imports: [TypeOrmModule.forFeature([Gmp, Matter, Proffessor, Group])],
  controllers: [GmpsController],
  providers: [GmpsProvider],
})
export class GmpsModule {}
