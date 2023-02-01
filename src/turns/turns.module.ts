import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Turn } from './turn.entity';
import { TurnsController } from './turns.controller';
import { TurnsResolver } from './turns.resolver';
import { TurnsProvider } from './turns.service';

@Module({
  imports: [TypeOrmModule.forFeature([Turn])],
  controllers: [TurnsController],
  providers: [TurnsProvider, TurnsResolver]
})
export class TurnsModule { }
