import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Matter } from './matter.entity';
import { MattersController } from './matters.controller';
import { MattersProvider } from './matters.service';

@Module({
  imports: [TypeOrmModule.forFeature([Matter])],
  controllers: [MattersController],
  providers: [MattersProvider],
})
export class MattersModule {}
