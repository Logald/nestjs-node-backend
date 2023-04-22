import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isEmpty } from 'src/utils/empty_object.utils';
import { turnFoundError, turnNotFoundError } from 'src/utils/errors.utils';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateTurnDto } from './dtos/create_turn.dto';
import { FindTurnDto } from './dtos/find_turn.dto';
import { UpdateTurnDto } from './dtos/update_turn.dto';
import { Turn } from './turn.entity';

@Injectable()
export class TurnsProvider {
  constructor (
    @InjectRepository(Turn) private readonly turnService: Repository<Turn>
  ) { }

  public async createTurnsIfNotExists () {
    const turns: CreateTurnDto[] = [
      { name: 'Matutino' },
      { name: 'Vespertino' },
      { name: 'Nocturno' }
    ];
    const turnsFoundPromise = await Promise.all(turns.map(async (turn) => {
      return this.turnService.findOne({ where: { name: turn.name } })
    }))
    const turnsFound = turnsFoundPromise.filter((turn) => !turn).length;
    if (turnsFound !== 0) {
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      turns.forEach(async (turn) => {
        await this.turnService.insert(turn);
      })
    }
  }

  async findOne (findOneOptions: FindOneOptions<Turn>, found: boolean = true) {
    const turnFound = await this.turnService.findOne(findOneOptions);
    if (found && !turnFound) turnNotFoundError();
    else if (!found && turnFound) turnFoundError();
    else return turnFound;
  }

  async getTurns (findManyOptions: FindTurnDto) {
    return await this.turnService.find({ where: findManyOptions });
  }

  async getTurn (turnId: number) {
    return await this.findOne({ where: { id: turnId } });
  }

  async createTurn (turnData: CreateTurnDto) {
    await this.findOne({ where: { name: turnData.name } }, false);
    await this.turnService.insert(turnData);
    return true;
  }

  async updateTurn (turnId: number, turnData: UpdateTurnDto) {
    isEmpty(turnData);
    await this.findOne({ where: { id: turnId } });
    await this.findOne({ where: { name: turnData.name } }, false);
    await this.turnService.update(turnId, turnData);
    return true;
  }

  async deleteTurn (turnId: number) {
    await this.findOne({ where: { id: turnId } });
    await this.turnService.delete(turnId);
    return true;
  }
}
