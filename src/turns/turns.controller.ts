import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards
} from '@nestjs/common'
import { AccessTokenGuard } from 'src/users/accessTokenGuard'
import { z } from 'zod'
import { CreateTurn } from './schemas/create_turn.schema'
import { UpdateTurn } from './schemas/update_turn.schema'
import { Turn } from './turn.entity'
import { TurnsProvider } from './turns.service'

@UseGuards(AccessTokenGuard)
@Controller('turns')
export class TurnsController {
  constructor (private readonly turnsProvider: TurnsProvider) {}

  @Post()
  async getTurns (@Body() turnData: Turn) {
    return await this.turnsProvider.getTurns(turnData)
  }

  @Post('/create')
  async createTurn (@Body() turnData: z.infer<typeof CreateTurn>) {
    return await this.turnsProvider.createTurn(turnData)
  }

  @Get('/:id')
  async getTurn (@Param('id') turnId: number) {
    return await this.turnsProvider.getTurn(turnId)
  }

  @Patch('/:id')
  async updateTurn (
  @Param('id') turnId: number,
    @Body() turnData: z.infer<typeof UpdateTurn>
  ) {
    return await this.turnsProvider.updateTurn(turnId, turnData)
  }

  @Delete('/:id')
  async deleteTurn (@Param('id') turnId: number) {
    return await this.turnsProvider.deleteTurn(turnId)
  }
}
