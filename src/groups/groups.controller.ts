import { Body, Controller, Post } from '@nestjs/common';
import { CreateGroup } from './dto/createGroup.dto';
import { GroupsProvider } from './groups.service';

@Controller('groups')
export class GroupsController {
  constructor(private groupsProvider: GroupsProvider) {}

  @Post()
  createGroup(@Body() groupDate: CreateGroup) {
    return this.groupsProvider.createGroup(groupDate);
  }
}
