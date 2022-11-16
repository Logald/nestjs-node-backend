import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTurn } from './dto/createTurn.dto';
import { Turn } from './turn.entity';

@Injectable()
export class TurnsProvider {
  constructor(@InjectRepository(Turn) private turnService: Repository<Turn>) {}

  async createTurn(turnData: CreateTurn) {
    const turnFound = await this.turnService.findOne({
      where: { name: turnData.name },
    });
    if (turnFound) return new HttpException('Turn was found', HttpStatus.FOUND);
    const tempTurn = this.turnService.create(turnData);
    return await this.turnService.save(tempTurn);
  }
}
