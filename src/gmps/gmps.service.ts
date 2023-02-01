import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MG } from 'src/mgs/mg.entity';
import { MGProvider } from 'src/mgs/mgs.service';
import { Proffessor } from 'src/proffessors/proffessor.entity';
import { ProffessorsProvider } from 'src/proffessors/proffessors.service';
import { isEmpty } from 'src/utils/empty_object.utils';
import { gmpFoundError, gmpNotFoundError } from 'src/utils/errors.utils';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateGmpDto } from './dtos/create_gmp.dto';
import { FindGmpDto } from './dtos/find_gmp.dto';
import { UpdateGmpDto } from './dtos/update_gmp.dto';
import { Gmp } from './gmp.entity';

@Injectable()
export class GmpsProvider {
  constructor(
    @InjectRepository(Gmp) private readonly gmpsService: Repository<Gmp>,
    @InjectRepository(MG) private readonly mgService: Repository<MG>,
    @InjectRepository(Proffessor)
    private readonly proffessorsService: Repository<Proffessor>,
    private readonly mgsProvider: MGProvider,
    private readonly proffessorsProvider: ProffessorsProvider,
  ) {}

  async getGmps(findManyOptions: FindGmpDto) {
    return await this.gmpsService.find({ where: findManyOptions });
  }

  async getGmpsWithRelations(findManyOptions: FindGmpDto) {
    return await this.gmpsService.find({
      where: findManyOptions,
      relations: ['mg', 'proffessor'],
    });
  }

  async findOne(findOneOptions: FindOneOptions<Gmp>, found: boolean = true) {
    const gmpFound = await this.gmpsService.findOne(findOneOptions);
    if (found && !gmpFound) gmpNotFoundError();
    else if (!found && gmpFound) gmpFoundError();
    else return gmpFound;
  }

  async getGmp(gmpId: number) {
    return await this.findOne({ where: { id: gmpId } });
  }

  async getGmpWithRelations(gmpId: number) {
    return await this.findOne({
      where: { id: gmpId },
      relations: ['mg', 'proffessor'],
    });
  }

  async createGmp(gmpData: CreateGmpDto) {
    await this.mgsProvider.findOne({ where: { id: gmpData.mgId } });
    await this.proffessorsProvider.findOne({
      where: { id: gmpData.proffessorId },
    });
    await this.findOne(
      {
        where: [
          {
            mgId: gmpData.mgId,
            proffessorId: gmpData.proffessorId,
          },
          { mgId: gmpData.mgId, active: true },
        ],
      },
      false,
    );
    return await this.gmpsService.insert(gmpData);
  }

  async updateGmp(gmpId: number, gmpData: UpdateGmpDto) {
    isEmpty(gmpData);
    await this.findOne({ where: { id: gmpId } });
    if ('mgId' in gmpData)
      await this.mgsProvider.findOne({ where: { id: gmpData.mgId } });
    if ('proffessorId' in gmpData) {
      await this.proffessorsProvider.findOne({
        where: { id: gmpData.proffessorId },
      });
    }
    return await this.gmpsService.update({ id: gmpId }, gmpData).catch(() => {
      gmpFoundError();
    });
  }

  async deleteGmp(gmpId: number) {
    await this.findOne({ where: { id: gmpId } });
    return await this.gmpsService.delete(gmpId);
  }
}
