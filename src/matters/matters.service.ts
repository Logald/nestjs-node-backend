import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isEmpty } from 'src/utils/empty_object.utils';
import { matterFoundError, matterNotFoundError } from 'src/utils/errors.utils';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateMatterDto } from './dtos/create_matter.dto';
import { FindMatterDto } from './dtos/find_matter.dto';
import { UpdateMatterDto } from './dtos/update_matter.dto';
import { Matter } from './matter.entity';
@Injectable()
export class MattersProvider {
  constructor (
    @InjectRepository(Matter) private readonly matterService: Repository<Matter>
  ) { }

  async findOne (findOneOptions: FindOneOptions<Matter>, found: boolean = true) {
    const matterFound = await this.matterService.findOne(findOneOptions);
    if (found && !matterFound) matterNotFoundError();
    else if (!found && matterFound) matterFoundError();
    else return matterFound;
  }

  async getMatters (findManyOptions: FindMatterDto) {
    return await this.matterService.find({ where: findManyOptions });
  }

  async getMatter (matterId: number) {
    return await this.findOne({ where: { id: matterId } });
  }

  async createMatter (matterData: CreateMatterDto) {
    await this.findOne({ where: { code: matterData.code } }, false);
    await this.matterService.insert(matterData);
    return true;
  }

  async updateMatter (matterId: number, matterData: UpdateMatterDto) {
    isEmpty(matterData);
    await this.findOne({ where: { id: matterId } });
    if ('code' in matterData) { await this.findOne({ where: { code: matterData.code } }, false); }
    await this.matterService.update(matterId, matterData);
    return true;
  }

  async deleteMatter (matterId: number) {
    await this.findOne({ where: { id: matterId } });
    await this.matterService.delete(matterId);
    return true;
  }
}
