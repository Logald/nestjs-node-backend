import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { isEmpty } from 'src/utils/empty_object.utils'
import { turnFoundError, turnNotFoundError } from 'src/utils/errors.utils'
import { FindOneOptions, Repository } from 'typeorm'
import { CreateTurnDto } from './dtos/create_turn.dto'
import { FindTurnDto } from './dtos/find_turn.dto'
import { UpdateTurnDto } from './dtos/update_turn.dto'
import { Turn } from './turn.entity'

@Injectable()
export class TurnsProvider {
  constructor (@InjectRepository(Turn) private readonly turnService: Repository<Turn>) {}

  async findOne (findOneOptions: FindOneOptions<Turn>, found: boolean = true) {
    const turnFound = await this.turnService.findOne(findOneOptions)
    if (found && !turnFound) turnNotFoundError()
    else if (!found && turnFound) turnFoundError()
    else return turnFound
  }

  async getTurns (findManyOptions: FindTurnDto) {
    return await this.turnService.find({ where: findManyOptions })
  }

  async getTurn (turnId: number) {
    return await this.findOne({ where: { id: turnId } })
  }

  async createTurn (turnData: CreateTurnDto) {
    await this.findOne({ where: { name: turnData.name } }, false)
    return await this.turnService.insert(turnData)
  }

  async updateTurn (turnId: number, turnData: UpdateTurnDto) {
    isEmpty(turnData)
    await this.findOne({ where: { id: turnId } })
    await this.findOne({ where: { name: turnData.name } }, false)
    return await this.turnService.update(turnId, turnData)
  }

  async deleteTurn (turnId: number) {
    await this.findOne({ where: { id: turnId } })
    return await this.turnService.delete(turnId)
  }
}
