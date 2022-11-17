import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateGroup } from './dto/createGroup.dto';
import { GroupsProvider } from './groups.service';

@Controller('groups')
export class GroupsController {
  constructor(private groupsProvider: GroupsProvider) {}

  @Get()
  getGroups() {
    return this.groupsProvider.getGroups();
  }

  @Get('/:id')
  getGroup(@Param('id') groupId: number) {
    return this.groupsProvider.getGroup(groupId);
  }

  @Post()
  createGroup(@Body() groupDate: CreateGroup) {
    return this.groupsProvider.createGroup(groupDate);
  }
}
