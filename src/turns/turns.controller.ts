import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
  UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/users/accessTokenGuard';
import { CreateTurnDto } from './dtos/create_turn.dto';
import { FindTurnDto } from './dtos/find_turn.dto';
import { UpdateTurnDto } from './dtos/update_turn.dto';
import { TurnsProvider } from './turns.service';
import { Response } from 'express';

@UseGuards(AccessTokenGuard)
@ApiBearerAuth()
@ApiTags('api/turns')
@Controller('api/turns')
export class TurnsController {
  constructor (private readonly turnsProvider: TurnsProvider) { }

  @Post()
  async getTurns (@Body() turnData: FindTurnDto) {
    return await this.turnsProvider.getTurns(turnData);
  }

  @Post('/create')
  async createTurn (@Body() turnData: CreateTurnDto, @Res() res: Response) {
    return res.json(await this.turnsProvider.createTurn(turnData));
  }

  @Get('/:id')
  async getTurn (@Param('id', ParseIntPipe) turnId: number) {
    return await this.turnsProvider.getTurn(turnId);
  }

  @Put('/:id')
  async updateTurn (
  @Param('id', ParseIntPipe) turnId: number,
    @Body() turnData: UpdateTurnDto,
    @Res() res: Response
  ) {
    return res.json(await this.turnsProvider.updateTurn(turnId, turnData));
  }

  @Delete('/:id')
  async deleteTurn (@Param('id', ParseIntPipe) turnId: number, @Res() res: Response) {
    return res.json(await this.turnsProvider.deleteTurn(turnId));
  }
}
