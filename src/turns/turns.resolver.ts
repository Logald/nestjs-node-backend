import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphAuthGuard } from 'src/users/graphAuthguard';
import { CreateTurnDto } from './dtos/create_turn.dto';
import { FindTurnDto } from './dtos/find_turn.dto';
import { UpdateTurnDto } from './dtos/update_turn.dto';
import { Turn } from './turn.entity';
import { TurnsProvider } from './turns.service';

@Resolver()
export class TurnsResolver {
  constructor (private readonly turnsProvider: TurnsProvider) { }

  @UseGuards(GraphAuthGuard)
  @Query(() => [Turn])
  async getTurns (
  @Args({ name: 'findOptions', nullable: true, type: () => FindTurnDto }) findOptions?: FindTurnDto
  ) {
    return await this.turnsProvider.getTurns(findOptions);
  }

  @UseGuards(GraphAuthGuard)
  @Query(() => Turn)
  async getTurn (
  @Args({ name: 'turnId', type: () => Int }) turnId: number
  ) {
    return await this.turnsProvider.getTurn(turnId)
  }

  @UseGuards(GraphAuthGuard)
  @Mutation(() => Boolean)
  async createTurn (
  @Args({ name: 'turnData', type: () => CreateTurnDto }) turnData: CreateTurnDto
  ) {
    return await this.turnsProvider.createTurn(turnData)
  }

  @UseGuards(GraphAuthGuard)
  @Mutation(() => Boolean)
  async updateTurn (
  @Args({ name: 'turnId', type: () => Int }) turnId: number,
    @Args({ name: 'turnData', type: () => UpdateTurnDto }) turnData: UpdateTurnDto
  ) {
    return await this.turnsProvider.updateTurn(turnId, turnData)
  }

  @UseGuards(GraphAuthGuard)
  @Mutation(() => Boolean)
  async deleteTurn (
  @Args({ name: 'turnId', type: () => Int }) turnId: number
  ) {
    return await this.turnsProvider.deleteTurn(turnId)
  }
}
