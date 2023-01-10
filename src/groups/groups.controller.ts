import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { AccessTokenGuard } from 'src/users/accessTokenGuard'
import { CreateGroupDto } from './dtos/create_group.dto'
import { FindGroupDto } from './dtos/find_group.dto'
import { UpdateGroupDto } from './dtos/update_group.dto'
import { GroupsProvider } from './groups.service'

@UseGuards(AccessTokenGuard)
@ApiBearerAuth()
@ApiTags('groups')
@Controller('groups')
export class GroupsController {
  constructor (private readonly groupsProvider: GroupsProvider) {}

  @Post()
  async getGroups (@Body() findManyOptions: FindGroupDto) {
    return await this.groupsProvider.getGroups(findManyOptions)
  }

  @Post('/all')
  async getGroupsWithRelations (@Body() findManyOptions: FindGroupDto) {
    return await this.groupsProvider.getGroupsWithRelations(findManyOptions)
  }

  @Post('/create')
  async createGroup (@Body() groupDate: CreateGroupDto) {
    return await this.groupsProvider.createGroup(groupDate)
  }

  @Get('/:id')
  async getGroup (@Param('id', ParseIntPipe) groupId: number) {
    return await this.groupsProvider.getGroup(groupId)
  }

  @Get('/:id/all')
  async getGroupWithRelations (@Param('id', ParseIntPipe) groupId: number) {
    return await this.groupsProvider.getGroupWithRelations(groupId)
  }

  @Patch('/:id')
  async updateGroup (
  @Param('id', ParseIntPipe) groupId: number,
    @Body() groupData: UpdateGroupDto
  ) {
    return await this.groupsProvider.updateGroup(groupId, groupData)
  }

  @Delete('/:id')
  async deleteGroup (@Param('id', ParseIntPipe) groupId: number) {
    return await this.groupsProvider.deleteGroup(groupId)
  }
}
