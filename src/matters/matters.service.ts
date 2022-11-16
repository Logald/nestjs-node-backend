import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMatter } from './dto/createMatter.dto';
import { Matter } from './matter.entity';

@Injectable()
export class MattersProvider {
  constructor(
    @InjectRepository(Matter) private matterService: Repository<Matter>,
  ) {}

  async getMatters() {
    return await this.matterService.find();
  }

  async getMatter(matterId: number) {
    const matter = await this.matterService.findOne({
      where: { id: matterId },
    });
    if (!matter)
      return new HttpException('Matter not found', HttpStatus.NOT_FOUND);
    return matter;
  }

  async createMatter(matterData: CreateMatter) {
    const matterFound = await this.matterService.findOne({
      where: { name: matterData.name },
    });
    if (matterFound) return new HttpException('Matter found', HttpStatus.FOUND);
    const tempMatter = this.matterService.create(matterData);
    return await this.matterService.save(tempMatter);
  }

  async updateMatter(matterId: number, matterData: Partial<CreateMatter>) {
    const matter = await this.matterService.findOne({
      where: { id: matterId },
    });
    if (!matter)
      return new HttpException('Matter not found', HttpStatus.NOT_FOUND);
    if ('name' in matterData) {
      const matterMatchName = await this.matterService.findOne({
        where: { name: matterData.name },
      });
      if (matterMatchName)
        return new HttpException('Bad matter name', HttpStatus.NOT_ACCEPTABLE);
    }
    return this.matterService.update(matterId, matterData);
  }

  async deleteMatter(matterId: number) {
    const matterFound = await this.matterService.delete(matterId);
    if (matterFound.affected == 0)
      return new HttpException('Matter not found', HttpStatus.NOT_FOUND);
    return matterFound;
  }
}
