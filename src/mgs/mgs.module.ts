import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Group } from 'src/groups/group.entity'
import { Matter } from 'src/matters/matter.entity'
import { MG } from './mg.entity'
import { MGController } from './mgs.controller'
import { MGProvider } from './mgs.service'

@Module({
  imports: [TypeOrmModule.forFeature([MG, Matter, Group])],
  controllers: [MGController],
  providers: [MGProvider]
})
export class MGModule {}
