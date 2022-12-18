import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { z } from 'zod';
import { Group } from './group.entity';
import { GroupsProvider } from './groups.service';
import { CreateGroup } from './schemas/create_group.schema';
import { UpdateGroup } from './schemas/update_group.schema';

@Controller('groups')
export class GroupsController {
  constructor(private groupsProvider: GroupsProvider) {}

  @Post()
  getGroups(@Body() findManyOptions: Group) {
    return this.groupsProvider.getGroups(findManyOptions);
  }

  @Post('/all')
  getGroupsWithRelations(@Body() findManyOptions: Group) {
    return this.groupsProvider.getGroupsWithRelations(findManyOptions);
  }

  @Post('/create')
  createGroup(@Body() groupDate: z.infer<typeof CreateGroup>) {
    return this.groupsProvider.createGroup(groupDate);
  }

  @Post('/:id')
  getGroup(@Param('id') groupId: number) {
    return this.groupsProvider.getGroup(groupId);
  }

  @Post('/:id/all')
  getGroupWithRelations(@Param('id') groupId: number) {
    return this.groupsProvider.getGroupWithRelations(groupId);
  }

  @Patch('/:id')
  updateGroup(
    @Param('id') groupId: number,
    @Body() groupData: z.infer<typeof UpdateGroup>,
  ) {
    return this.groupsProvider.updateGroup(groupId, groupData);
  }

  @Delete('/:id')
  deleteGroup(@Param('id') groupId: number) {
    return this.groupsProvider.deleteGroup(groupId);
  }
}
