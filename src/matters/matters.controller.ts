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
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/users/accessTokenGuard';
import { CreateMatterDto } from './dtos/create_matter.dto';
import { FindMatterDto } from './dtos/find_matter.dto';
import { UpdateMatterDto } from './dtos/update_matter.dto';
import { MattersProvider } from './matters.service';

@UseGuards(AccessTokenGuard)
@ApiBearerAuth()
@ApiTags('matters')
@Controller('matters')
export class MattersController {
  constructor(private readonly matterProvider: MattersProvider) { }

  @Post()
  async getMatters(@Body() findMatterOptions: FindMatterDto) {
    return await this.matterProvider.getMatters(findMatterOptions);
  }

  @Post('/create')
  async createMatter(@Body() matterData: CreateMatterDto) {
    await this.matterProvider.createMatter(matterData);
    return true;
  }

  @Get('/:id')
  async getMatter(@Param('id', ParseIntPipe) matterId: number) {
    return await this.matterProvider.getMatter(matterId);
  }

  @Patch('/:id')
  async updateMatter(
    @Param('id', ParseIntPipe) matterId: number,
    @Body() matterData: UpdateMatterDto,
  ) {
    await this.matterProvider.updateMatter(matterId, matterData);
    return true;
  }

  @Delete('/:id')
  async deleteMatter(@Param('id', ParseIntPipe) matterId: number) {
    await this.matterProvider.deleteMatter(matterId);
    return true;
  }
}
