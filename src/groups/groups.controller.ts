import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards
} from '@nestjs/common'
import { AccessTokenGuard } from 'src/users/accessTokenGuard'
import { z } from 'zod'
import { Group } from './group.entity'
import { GroupsProvider } from './groups.service'
import { CreateGroup } from './schemas/create_group.schema'
import { UpdateGroup } from './schemas/update_group.schema'

@UseGuards(AccessTokenGuard)
@Controller('groups')
export class GroupsController {
  constructor (private readonly groupsProvider: GroupsProvider) {}

  @Post()
  async getGroups (@Body() findManyOptions: Group) {
    return await this.groupsProvider.getGroups(findManyOptions)
  }

  @Post('/all')
  async getGroupsWithRelations (@Body() findManyOptions: Group) {
    return await this.groupsProvider.getGroupsWithRelations(findManyOptions)
  }

  @Post('/create')
  async createGroup (@Body() groupDate: z.infer<typeof CreateGroup>) {
    return await this.groupsProvider.createGroup(groupDate)
  }

  @Get('/:id')
  async getGroup (@Param('id') groupId: number) {
    return await this.groupsProvider.getGroup(groupId)
  }

  @Get('/:id/all')
  async getGroupWithRelations (@Param('id') groupId: number) {
    return await this.groupsProvider.getGroupWithRelations(groupId)
  }

  @Patch('/:id')
  async updateGroup (
  @Param('id') groupId: number,
    @Body() groupData: z.infer<typeof UpdateGroup>
  ) {
    return await this.groupsProvider.updateGroup(groupId, groupData)
  }

  @Delete('/:id')
  async deleteGroup (@Param('id') groupId: number) {
    return await this.groupsProvider.deleteGroup(groupId)
  }
}
