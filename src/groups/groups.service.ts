import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Turn } from 'src/turns/turn.entity';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
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

  async getActiveGroups() {
    return await this.groupService.find({ where: { active: true } });
  }

  async getInactiveGroups() {
    return await this.groupService.find({ where: { active: false } });
  }

  async getGroupsWithTurn() {
    return await this.groupService.find({ relations: ['turn'] });
  }

  async findGroupsWithTurnid(
    turnId: number,
    findOptions: FindManyOptions<Group>,
  ) {
    const turnFound = await this.turnService.findOne({ where: { id: turnId } });
    if (!turnFound)
      return new HttpException('Turn not found', HttpStatus.NOT_ACCEPTABLE);
    return await this.groupService.find(findOptions);
  }

  async getGroupsWithTurnid(turnId: number) {
    return await this.findGroupsWithTurnid(turnId, {
      where: { turnId },
    });
  }

  async getActiveGroupsWithTurnid(turnId: number) {
    return await this.findGroupsWithTurnid(turnId, {
      where: { turnId, active: true },
    });
  }

  async getActiveGroupsWithTurn() {
    return await this.groupService.find({
      where: { active: true },
      relations: ['turn'],
    });
  }

  async getInactiveGroupsWithTurnid(turnId: number) {
    return await this.findGroupsWithTurnid(turnId, {
      where: { turnId, active: false },
    });
  }

  async getInactiveGroupsWithTurn() {
    return await this.groupService.find({
      where: { active: false },
      relations: ['turn'],
    });
  }

  private async findGroup(groupId: number, findOptions: FindOneOptions<Group>) {
    const groupFound = await this.groupService.findOne(findOptions);
    if (!groupFound)
      return new HttpException('Group not found', HttpStatus.NOT_FOUND);
    return groupFound;
  }

  async getGroup(groupId: number) {
    return await this.findGroup(groupId, {
      where: { id: groupId },
    });
  }

  async getGroupWithTurn(groupId: number) {
    return await this.findGroup(groupId, {
      where: { id: groupId },
      relations: ['turn'],
    });
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

  async updateGroup(
    groupId: number,
    groupData: Partial<Omit<Group, 'id' | 'turn'>>,
  ) {
    if ('turnId' in groupData) {
      const turnFound = await this.turnService.findOne({
        where: { id: groupData.turnId },
      });
      if (!turnFound)
        return new HttpException('Turn not found', HttpStatus.NOT_ACCEPTABLE);
    }
    const updatedGroup = await this.groupService.update(groupId, groupData);
    if (updatedGroup.affected == 0)
      return new HttpException('Group not found', HttpStatus.NOT_FOUND);
    return updatedGroup;
  }

  async deleteGroup(groupId: number) {
    const deletedData = await this.groupService.delete(groupId);
    if (deletedData.affected == 0)
      return new HttpException('Group not found', HttpStatus.NOT_FOUND);
    return deletedData;
  }
}
