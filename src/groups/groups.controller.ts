import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateGroup } from './dto/createGroup.dto';
import { GroupsProvider } from './groups.service';

@Controller('groups')
export class GroupsController {
  constructor(private groupsProvider: GroupsProvider) {}

  @Get()
  getGroups() {
    return this.groupsProvider.getGroups();
  }

  @Get('/turn')
  getGroupsWithTurn() {
    return this.groupsProvider.getGroupsWithTurn();
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

  @Delete('/:id')
  deleteGroup(@Param('id') groupId: number) {
    return this.groupsProvider.deleteGroup(groupId);
  }
}
