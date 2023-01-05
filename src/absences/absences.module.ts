import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Gmp } from 'src/gmps/gmp.entity'
import { Turn } from 'src/turns/turn.entity'
import { Absence } from './abcense.entity'
import { AbsencesController } from './absences.controller'
import { AbsencesProvider } from './absences.service'

@Module({
  imports: [TypeOrmModule.forFeature([Absence, Gmp, Turn])],
  controllers: [AbsencesController],
  providers: [AbsencesProvider]
})
export class AbsencesModule {}
