import { Body, Controller, Post } from '@nestjs/common';
import { CreateTurn } from './dto/createTurn.dto';
import { TurnsProvider } from './turns.service';

@Controller('turns')
export class TurnsController {
  constructor(private turnsProvider: TurnsProvider) {}

  @Post()
  createTurn(@Body() turnData: CreateTurn) {
    return this.turnsProvider.createTurn(turnData);
  }
}
