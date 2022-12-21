import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { z } from 'zod';
import { CreateTurn } from './schemas/create_turn.schema';
import { UpdateTurn } from './schemas/update_turn.schema';
import { Turn } from './turn.entity';

@Injectable()
export class TurnsProvider {
  constructor(@InjectRepository(Turn) private turnService: Repository<Turn>) {}

  async getTurns(findManyOptions: Turn) {
    return await this.turnService.find({ where: findManyOptions });
  }

  async getTurn(turnId: number) {
    const turnFound = await this.turnService.findOne({
      where: { id: turnId },
    });
    if (!turnFound)
      return new HttpException('Turn not found', HttpStatus.NOT_FOUND);
    return turnFound;
  }

  async createTurn(turnData: z.infer<typeof CreateTurn>) {
    const passFormat = CreateTurn.safeParse(turnData);
    if (!passFormat.success)
      return new HttpException('Invalid format', HttpStatus.NOT_ACCEPTABLE);
    turnData = passFormat.data;
    const turnFound = await this.turnService.findOne({
      where: { name: turnData.name },
    });
    if (turnFound) return new HttpException('Turn was found', HttpStatus.FOUND);
    const tempTurn = this.turnService.create(turnData);
    return await this.turnService.save(tempTurn);
  }

  async updateTurn(turnId: number, turnData: z.infer<typeof UpdateTurn>) {
    const passFormat = UpdateTurn.safeParse(turnData);
    if (!passFormat.success)
      return new HttpException('Invalid format', HttpStatus.NOT_ACCEPTABLE);
    if (Object.keys(passFormat.data).length == 0)
      return new HttpException('Empty object', HttpStatus.NOT_ACCEPTABLE);
    turnData = passFormat.data;
    const turnFound = await this.turnService.findOne({
      where: { id: turnId },
    });
    if (!turnFound)
      return new HttpException('Turn not found', HttpStatus.NOT_FOUND);
    if ('name' in turnData) {
      const turnMatchName = await this.turnService.findOne({
        where: { name: turnData.name },
      });
      if (turnMatchName)
        return new HttpException('Bad turn name', HttpStatus.NOT_ACCEPTABLE);
    }
    return await this.turnService.update(turnId, turnData);
  }

  async deleteTurn(turnId: number) {
    const turnFound = await this.turnService.delete(turnId);
    if (turnFound.affected == 0)
      return new HttpException('Turn not found', HttpStatus.NOT_FOUND);
    return turnFound;
  }
}
