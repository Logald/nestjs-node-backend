import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Turn } from 'src/turns/turn.entity';
import { Repository } from 'typeorm';
import { CreateGroup } from './dto/createGroup.dto';
import { Group } from './group.entity';

@Injectable()
export class GroupsProvider {
  constructor(
    @InjectRepository(Group) private groupService: Repository<Group>,
    @InjectRepository(Turn) private turnService: Repository<Turn>,
  ) {}

  async getGroups() {
    return await this.groupService.find();
  }

  async getGroupsWithTurn() {
    return await this.groupService.find({ relations: ['turn'] });
  }

  async getGroup(groupId: number) {
    const groupFound = await this.groupService.findOne({
      where: { id: groupId },
    });
    if (!groupFound)
      return new HttpException('Group not found', HttpStatus.NOT_FOUND);
    return groupFound;
  }

  async createGroup(groupData: CreateGroup) {
    const turnFound = await this.turnService.findOne({
      where: { id: groupData.turnId },
    });
    const groupFound = await this.groupService.findOne({
      where: { name: groupData.name },
    });
    if (!turnFound)
      return new HttpException('Turn not found', HttpStatus.NOT_ACCEPTABLE);
    if (groupFound)
      return new HttpException('Bad group name', HttpStatus.NOT_ACCEPTABLE);
    const tempGroup = this.groupService.create(groupData);
    return await this.groupService.save(tempGroup);
  }
}
