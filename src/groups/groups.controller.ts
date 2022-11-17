import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateGroup } from './dto/createGroup.dto';
import { Group } from './group.entity';
import { GroupsProvider } from './groups.service';

@Controller('groups')
export class GroupsController {
  constructor(private groupsProvider: GroupsProvider) {}

  @Get()
  getGroups() {
    return this.groupsProvider.getGroups();
  }

  @Get('/active')
  getActiveGroups() {
    return this.groupsProvider.getActiveGroups();
  }

  @Get('/inactive')
  getInactiveGroups() {
    return this.groupsProvider.getInactiveGroups();
  }

  @Get('/turn')
  getGroupsWithTurn() {
    return this.groupsProvider.getGroupsWithTurn();
  }

  @Get('/turn/:id/active')
  getActiveGroupsWithTurnid(@Param('id') turnId: number) {
    return this.groupsProvider.getActiveGroupsWithTurnid(turnId);
  }

  @Get('/turn/:id/inactive')
  getInactiveGroupsWithTurnid(@Param('id') turnId: number) {
    return this.groupsProvider.getInactiveGroupsWithTurnid(turnId);
  }

  @Get('/:id')
  getGroup(@Param('id') groupId: number) {
    return this.groupsProvider.getGroup(groupId);
  }

  @Get('/turn/:id')
  getGroupWithTurn(@Param('id') groupId: number) {
    return this.groupsProvider.getGroupWithTurn(groupId);
  }

  @Post()
  createGroup(@Body() groupDate: CreateGroup) {
    return this.groupsProvider.createGroup(groupDate);
  }

  @Patch('/:id')
  updateGroup(
    @Param('id') groupId: number,
    @Body() groupData: Partial<Omit<Group, 'id' | 'turn'>>,
  ) {
    return this.groupsProvider.updateGroup(groupId, groupData);
  }

  @Delete('/:id')
  deleteGroup(@Param('id') groupId: number) {
    return this.groupsProvider.deleteGroup(groupId);
  }
}
