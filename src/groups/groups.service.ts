import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Turn } from 'src/turns/turn.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { z } from 'zod';
import { Group } from './group.entity';
import { CreateGroup } from './schemas/create_group.schema';
import { UpdateGroup } from './schemas/update_group.schema';

@Injectable()
export class GroupsProvider {
  constructor(
    @InjectRepository(Group) private groupService: Repository<Group>,
    @InjectRepository(Turn) private turnService: Repository<Turn>,
  ) {}

  async getGroups(findManyOptions: Group) {
    return await this.groupService.find({ where: findManyOptions });
  }

  async getGroupsWithRelations(findManyOptions: Group) {
    return await this.groupService.find({
      where: findManyOptions,
      relations: ['turn'],
    });
  }

  private async findGroup(findOneOptions: FindOneOptions<Group>) {
    const groupFound = await this.groupService.findOne(findOneOptions);
    if (!groupFound)
      throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
    return groupFound;
  }

  async getGroup(groupId: number) {
    return await this.findGroup({
      where: { id: groupId },
    });
  }

  async getGroupWithRelations(groupId: number) {
    return await this.findGroup({
      where: { id: groupId },
      relations: ['turn'],
    });
  }

  async createGroup(groupData: z.infer<typeof CreateGroup>) {
    const passFormat = CreateGroup.safeParse(groupData);
    if (!passFormat.success)
      throw new HttpException('Invalid format', HttpStatus.NOT_ACCEPTABLE);
    groupData = passFormat.data;
    const groupFound = await this.groupService.findOne({
      where: { grade: groupData.grade, name: groupData.name },
    });
    if (groupFound) throw new HttpException('Group found', HttpStatus.FOUND);
    const turnFound = await this.turnService.findOne({
      where: { id: groupData.turnId },
    });
    if (!turnFound)
      throw new HttpException('Turn not found', HttpStatus.NOT_ACCEPTABLE);
    return await this.groupService.insert(groupData);
  }

  async updateGroup(groupId: number, groupData: z.infer<typeof UpdateGroup>) {
    const passFormat = UpdateGroup.safeParse(groupData);
    if (!passFormat.success)
      throw new HttpException('Invalid format', HttpStatus.NOT_ACCEPTABLE);
    if (Object.keys(passFormat.data).length == 0)
      throw new HttpException('Empty object', HttpStatus.NOT_ACCEPTABLE);
    groupData = passFormat.data;
    if ('turnId' in groupData) {
      const turnFound = await this.turnService.findOne({
        where: { id: groupData.turnId },
      });
      if (!turnFound)
        throw new HttpException('Turn not found', HttpStatus.NOT_ACCEPTABLE);
    }
    return await this.groupService
      .update(groupId, groupData)
      .then((updateResult) => {
        if (updateResult.affected == 0)
          throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
        return updateResult;
      })
      .catch(() => {
        throw new HttpException('Group found', HttpStatus.FOUND);
      });
  }

  async deleteGroup(groupId: number) {
    const deletedData = await this.groupService.delete(groupId);
    if (deletedData.affected == 0)
      throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
    return deletedData;
  }
}
