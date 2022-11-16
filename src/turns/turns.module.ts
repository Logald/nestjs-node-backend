import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Turn } from './turn.entity';
import { TurnsController } from './turns.controller';
import { TurnsProvider } from './turns.service';

@Module({
  imports: [TypeOrmModule.forFeature([Turn])],
  controllers: [TurnsController],
  providers: [TurnsProvider],
})
export class TurnsModule {}
