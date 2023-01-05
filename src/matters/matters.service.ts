import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { z } from 'zod';
import { Matter } from './matter.entity';
import { CreateMatter } from './schemas/create_matter.schema';
import { UpdateMatter } from './schemas/update_matter.schema';
@Injectable()
export class MattersProvider {
  constructor(
    @InjectRepository(Matter) private matterService: Repository<Matter>,
  ) {}

  async getMatters(findManyOptions: Matter) {
    return await this.matterService.find({ where: findManyOptions });
  }

  async getMatter(matterId: number) {
    const matter = await this.matterService.findOne({
      where: { id: matterId },
    });
    if (!matter)
      throw new HttpException('Matter not found', HttpStatus.NOT_FOUND);
    return matter;
  }

  async createMatter(matterData: z.infer<typeof CreateMatter>) {
    const passFormat = CreateMatter.safeParse(matterData);
    if (!passFormat.success)
      throw new HttpException('Invalid format', HttpStatus.NOT_ACCEPTABLE);
    matterData = passFormat.data;
    const matterFound = await this.matterService.findOne({
      where: { name: matterData.name },
    });
    if (matterFound) throw new HttpException('Matter found', HttpStatus.FOUND);
    return await this.matterService.insert(matterData);
  }

  async updateMatter(
    matterId: number,
    matterData: z.infer<typeof UpdateMatter>,
  ) {
    const passFormat = UpdateMatter.safeParse(matterData);
    if (!passFormat.success)
      throw new HttpException('Invalid format', HttpStatus.NOT_ACCEPTABLE);
    if (Object.keys(passFormat.data).length == 0)
      throw new HttpException('Empty object', HttpStatus.NOT_ACCEPTABLE);
    matterData = passFormat.data;
    const matter = await this.matterService.findOne({
      where: { id: matterId },
    });
    if (!matter)
      throw new HttpException('Matter not found', HttpStatus.NOT_FOUND);
    if ('name' in matterData) {
      const matterMatchName = await this.matterService.findOne({
        where: { name: matterData.name },
      });
      if (matterMatchName)
        throw new HttpException('Bad matter name', HttpStatus.NOT_ACCEPTABLE);
    }
    return this.matterService.update(matterId, matterData);
  }

  async deleteMatter(matterId: number) {
    const matterFound = await this.matterService.delete(matterId);
    if (matterFound.affected == 0)
      throw new HttpException('Matter not found', HttpStatus.NOT_FOUND);
    return matterFound;
  }
}
