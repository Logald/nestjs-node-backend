import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { z } from 'zod';
import { CreateTurn } from './schemas/create_turn.schema';
import { UpdateTurn } from './schemas/update_turn.schema';
import { Turn } from './turn.entity';
import { TurnsProvider } from './turns.service';

@Controller('turns')
export class TurnsController {
  constructor(private turnsProvider: TurnsProvider) {}

  @Post()
  getTurns(@Body() turnData: Turn) {
    return this.turnsProvider.getTurns(turnData);
  }

  @Post()
  createTurn(@Body() turnData: z.infer<typeof CreateTurn>) {
    return this.turnsProvider.createTurn(turnData);
  }

  @Get('/:id')
  getTurn(@Param('id') turnId: number) {
    return this.turnsProvider.getTurn(turnId);
  }

  @Patch('/:id')
  updateTurn(
    @Param('id') turnId: number,
    @Body() turnData: z.infer<typeof UpdateTurn>,
  ) {
    return this.turnsProvider.updateTurn(turnId, turnData);
  }

  @Delete('/:id')
  deleteTurn(@Param('id') turnId: number) {
    return this.turnsProvider.deleteTurn(turnId);
  }
}
