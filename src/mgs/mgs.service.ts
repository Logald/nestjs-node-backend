import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from 'src/groups/group.entity';
import { Matter } from 'src/matters/matter.entity';
import { Repository } from 'typeorm';
import { z } from 'zod';
import { MG } from './mg.entity';
import { CreateMg } from './schema/create_mg.schema';
import { UpdateMg } from './schema/update_mg.schema';

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

  async createMg(mgData: z.infer<typeof CreateMg>) {
    const passFormat = CreateMg.safeParse(mgData);
    if (!passFormat.success)
      return new HttpException('Invalid format', HttpStatus.NOT_ACCEPTABLE);
    mgData = passFormat.data;
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

  async updateMg(mgId: number, mgData: z.infer<typeof UpdateMg>) {
    const passFormat = UpdateMg.safeParse(mgData);
    if (!passFormat.success)
      return new HttpException('Invalid format', HttpStatus.NOT_ACCEPTABLE);
    if (Object.keys(passFormat.data).length == 0)
      return new HttpException('Empty object', HttpStatus.NOT_ACCEPTABLE);
    mgData = passFormat.data;
    if ('matterId' in mgData) {
      const matterFound = await this.matterService.findOne({
        where: { id: mgData.matterId },
      });
      if (!matterFound)
        return new HttpException('Matter not found', HttpStatus.NOT_ACCEPTABLE);
    }
    if ('groupId' in mgData) {
      const groupFound = await this.groupService.findOne({
        where: { id: mgData.groupId },
      });
      if (!groupFound)
        return new HttpException('Group not found', HttpStatus.NOT_ACCEPTABLE);
    }
    return await this.mgService
      .update(mgId, mgData)
      .then((updateResult) => {
        if (updateResult.affected == 0)
          return new HttpException('Mg not found', HttpStatus.NOT_FOUND);
        return updateResult;
      })
      .catch(() => {
        return new HttpException('Mg found', HttpStatus.FOUND);
      });
  }

  async deleteMg(mgId: number) {
    const deleteResult = await this.mgService.delete(mgId);
    if (deleteResult.affected == 0)
      return new HttpException('Mg not found', HttpStatus.NOT_ACCEPTABLE);
    return deleteResult;
  }
}
