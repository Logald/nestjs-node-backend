import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
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

  @Patch('/:id')
  updateTurn(@Param('id') turnId: number, @Body() turnData) {
    return this.turnsProvider.updateTurn(turnId, turnData);
  }

  @Delete('/:id')
  deleteTurn(@Param('id') turnId: number) {
    return this.turnsProvider.deleteTurn(turnId);
  }
}
