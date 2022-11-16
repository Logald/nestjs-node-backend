import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateMatter } from './dto/creatematter.dto';
import { MattersProvider } from './matters.service';

@Controller('matters')
export class MattersController {
  constructor(private matterProvider: MattersProvider) {}

  @Get()
  getMatters() {
    return this.matterProvider.getMatters();
  }

  @Get('/:id')
  getMatter(@Param('id') matterId: number) {
    return this.matterProvider.getMatter(matterId);
  }

  @Post()
  createMatter(@Body() matterData: CreateMatter) {
    return this.matterProvider.createMatter(matterData);
  }

  @Patch('/:id')
  updateMatter(@Param('id') matterId: number, @Body() matterData) {
    return this.matterProvider.updateMatter(matterId, matterData);
  }

  @Delete('/:id')
  deleteMatter(@Param('id') matterId: number) {
    return this.matterProvider.deleteMatter(matterId);
  }
}
