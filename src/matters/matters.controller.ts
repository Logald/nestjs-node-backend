import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
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
@ApiTags('api/matters')
@Controller('api/matters')
export class MattersController {
  constructor(private readonly matterProvider: MattersProvider) { }

  @Post()
  async getMatters(@Body() findMatterOptions: FindMatterDto) {
    return await this.matterProvider.getMatters(findMatterOptions);
  }

  @Post('/create')
  async createMatter(@Body() matterData: CreateMatterDto) {
    return await this.matterProvider.createMatter(matterData);
  }

  @Get('/:id')
  async getMatter(@Param('id', ParseIntPipe) matterId: number) {
    return await this.matterProvider.getMatter(matterId);
  }

  @Put('/:id')
  async updateMatter(
    @Param('id', ParseIntPipe) matterId: number,
    @Body() matterData: UpdateMatterDto,
  ) {
    return await this.matterProvider.updateMatter(matterId, matterData);
  }

  @Delete('/:id')
  async deleteMatter(@Param('id', ParseIntPipe) matterId: number) {
    return await this.matterProvider.deleteMatter(matterId);
  }
}
