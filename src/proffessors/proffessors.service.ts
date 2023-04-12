import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isEmpty } from 'src/utils/empty_object.utils';
import {
  proffessorFoundError,
  proffessorNotFoundError
} from 'src/utils/errors.utils';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateProffessorDto } from './dtos/create_proffessor.dto';
import { FindProffessorDto } from './dtos/find_proffessor.dto';
import { UpdateProffessorDto } from './dtos/update_proffessor.dto';
import { Proffessor } from './proffessor.entity';

@Injectable()
export class ProffessorsProvider {
  constructor(
    @InjectRepository(Proffessor)
    private readonly proffessorsService: Repository<Proffessor>
  ) { }

  async getProffessors(findManyOptions: FindProffessorDto) {
    return await this.proffessorsService.find({ where: findManyOptions });
  }

  async findOne(
    findOneOptions: FindOneOptions<Proffessor>,
    found: boolean = true,
  ) {
    const proffessorFound = await this.proffessorsService.findOne(
      findOneOptions,
    );
    if (found && !proffessorFound) proffessorNotFoundError();
    else if (!found && proffessorFound) proffessorFoundError();
    else return proffessorFound;
  }

  async getProffessor(proffessorId: number) {
    return await this.findOne({ where: { id: proffessorId } });
  }

  async createProffessor(proffessorData: CreateProffessorDto) {
    await this.findOne({ where: { ci: proffessorData.ci } }, false);
    await this.proffessorsService.insert(proffessorData);
    return true;
  }

  async updateProffessor(
    proffessorId: number,
    proffessorData: UpdateProffessorDto,
  ) {
    isEmpty(proffessorData);
    if ('ci' in proffessorData)
      await this.findOne({ where: { ci: proffessorData.ci } }, false);
    await this.findOne({ where: { id: proffessorId } });
    await this.proffessorsService.update(proffessorId, proffessorData);
    return true;
  }

  async deleteProffessor(proffessorId: number) {
    await this.findOne({ where: { id: proffessorId } });
    await this.proffessorsService.delete(proffessorId);
    return true;
  }
}
