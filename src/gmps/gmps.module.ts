import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MG } from 'src/mgs/mg.entity'
import { Proffessor } from 'src/proffessors/proffessor.entity'
import { Gmp } from './gmp.entity'
import { GmpsController } from './gmps.controller'
import { GmpsProvider } from './gmps.service'

@Module({
  imports: [TypeOrmModule.forFeature([Gmp, MG, Proffessor])],
  controllers: [GmpsController],
  providers: [GmpsProvider]
})
export class GmpsModule {}
