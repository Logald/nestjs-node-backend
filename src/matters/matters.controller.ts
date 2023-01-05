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
import { Matter } from './matter.entity'
import { MattersProvider } from './matters.service'
import { CreateMatter } from './schemas/create_matter.schema'
import { UpdateMatter } from './schemas/update_matter.schema'

@UseGuards(AccessTokenGuard)
@Controller('matters')
export class MattersController {
  constructor (private readonly matterProvider: MattersProvider) {}

  @Post()
  async getMatters (@Body() findMatterOptions: Matter) {
    return await this.matterProvider.getMatters(findMatterOptions)
  }

  @Post('/create')
  async createMatter (@Body() matterData: z.infer<typeof CreateMatter>) {
    return await this.matterProvider.createMatter(matterData)
  }

  @Get('/:id')
  async getMatter (@Param('id') matterId: number) {
    return await this.matterProvider.getMatter(matterId)
  }

  @Patch('/:id')
  async updateMatter (
  @Param('id') matterId: number,
    @Body() matterData: z.infer<typeof UpdateMatter>
  ) {
    return await this.matterProvider.updateMatter(matterId, matterData)
  }

  @Delete('/:id')
  async deleteMatter (@Param('id') matterId: number) {
    return await this.matterProvider.deleteMatter(matterId)
  }
}
