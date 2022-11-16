import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateTurn } from './dto/createTurn.dto';
import { TurnsProvider } from './turns.service';

@Controller('turns')
export class TurnsController {
  constructor(private turnsProvider: TurnsProvider) {}

  @Get()
  getTurns() {
    return this.turnsProvider.getTurns();
  }

  @Get('/:id')
  getTurn(@Param('id') turnId: number) {
    return this.turnsProvider.getTurn(turnId);
  }

  @Post()
  createTurn(@Body() turnData: CreateTurn) {
    return this.turnsProvider.createTurn(turnData);
  }
}
