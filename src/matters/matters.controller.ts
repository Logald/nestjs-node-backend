import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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
}
