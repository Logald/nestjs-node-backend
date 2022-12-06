import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from 'src/groups/group.entity';
import { Matter } from 'src/matters/matter.entity';
import { Repository } from 'typeorm';
import { MG } from './mg.entity';

@Injectable()
export class MGProvider {
  constructor(
    @InjectRepository(MG) private mgService: Repository<MG>,
    @InjectRepository(Matter) private matterService: Repository<Matter>,
    @InjectRepository(Group) private groupService: Repository<Group>,
  ) {}

  async getMgs(mgsFindManyOptions: MG) {
    return await this.mgService.find({ where: mgsFindManyOptions });
  }

  async getMgsWithRelations(mgsFindManyOptions: MG) {
    return await this.mgService.find({
      where: mgsFindManyOptions,
      relations: ['matter', 'group'],
    });
  }

  async getMg(mgId: number) {
    const mgFound = await this.mgService.findOne({ where: { id: mgId } });
    if (!mgFound)
      return new HttpException('Mg not found', HttpStatus.NOT_FOUND);
    return mgFound;
  }

  async getMgWithRelations(mgId: number) {
    const mgFound = await this.mgService.findOne({
      where: { id: mgId },
      relations: ['matter', 'group'],
    });
    if (!mgFound)
      return new HttpException('Mg not found', HttpStatus.NOT_FOUND);
    return mgFound;
  }

  async createMg(mgData: Omit<MG, 'id'>) {
    const matterFound = await this.matterService.findOne({
      where: { id: mgData.matterId },
    });
    if (!matterFound)
      return new HttpException('Matter not found', HttpStatus.NOT_ACCEPTABLE);
    const groupFound = await this.groupService.findOne({
      where: { id: mgData.groupId },
    });
    if (!groupFound)
      return new HttpException('Group not found', HttpStatus.NOT_ACCEPTABLE);
    const mgFound = await this.mgService.findOne({
      where: { matterId: mgData.matterId, groupId: mgData.groupId },
    });
    if (mgFound) return new HttpException('MG found', HttpStatus.FOUND);
    return await this.mgService.insert(mgData);
  }
}
