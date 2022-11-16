import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMatter } from './dto/creatematter.dto';
import { Matter } from './matter.entity';

@Injectable()
export class MattersProvider {
  constructor(
    @InjectRepository(Matter) private matterService: Repository<Matter>,
  ) {}

  async getMatters() {
    return await this.matterService.find();
  }

  async createMatter(matterData: CreateMatter) {
    const matterFound = this.matterService.findOne({
      where: { name: matterData.name },
    });
    if (matterFound) return new HttpException('Matter found', HttpStatus.FOUND);
    const tempMatter = this.matterService.create(matterData);
    return await this.matterService.save(tempMatter);
  }
}
