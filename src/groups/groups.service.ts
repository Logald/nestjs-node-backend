import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Turn } from 'src/turns/turn.entity';
import { TurnsProvider } from 'src/turns/turns.service';
import { isEmpty } from 'src/utils/empty_object.utils';
import { groupFoundError, groupNotFoundError } from 'src/utils/errors.utils';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateGroupDto } from './dtos/create_group.dto';
import { FindGroupDto } from './dtos/find_group.dto';
import { UpdateGroupDto } from './dtos/update_group.dto';
import { Group } from './group.entity';

@Injectable()
export class GroupsProvider {
  constructor(
    @InjectRepository(Group) private readonly groupService: Repository<Group>,
    @InjectRepository(Turn) private readonly turnService: Repository<Turn>,
    private readonly turnProvider: TurnsProvider,
  ) { }

  async getGroups(findManyOptions: FindGroupDto) {
    return await this.groupService.find({ where: findManyOptions });
  }

  async getGroupsWithRelations(findManyOptions: FindGroupDto) {
    return await this.groupService.find({
      where: findManyOptions,
      relations: ['turn'],
    });
  }

  async findOne(findOneOptions: FindOneOptions<Group>, found: boolean = true) {
    const groupFound = await this.groupService.findOne(findOneOptions);
    if (found && !groupFound) groupNotFoundError();
    else if (!found && groupFound) groupFoundError();
    else return groupFound;
  }

  async getGroup(groupId: number) {
    return await this.findOne({ where: { id: groupId } });
  }

  async getGroupWithRelations(groupId: number) {
    return await this.findOne({
      where: { id: groupId },
      relations: ['turn'],
    });
  }

  async createGroup(groupData: CreateGroupDto) {
    await this.findOne(
      { where: { grade: groupData.grade, name: groupData.name } },
      false,
    );
    await this.turnProvider.findOne({ where: { id: groupData.turnId } });
    await this.groupService.insert(groupData);
    return true;
  }

  async updateGroup(groupId: number, groupData: UpdateGroupDto) {
    isEmpty(groupData);
    await this.findOne({ where: { id: groupId } });
    if ('turnId' in groupData)
      await this.turnProvider.findOne({ where: { id: groupData.turnId } });
    await this.groupService.update(groupId, groupData).catch(() => {
      groupFoundError();
    });
    return true;
  }

  async deleteGroup(groupId: number) {
    await this.findOne({ where: { id: groupId } });
    await this.groupService.delete(groupId);
    return true;
  }
}
