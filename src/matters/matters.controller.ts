import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateMatter } from './dto/creatematter.dto';
import { MattersProvider } from './matters.service';

@Controller('matters')
export class MattersController {
  constructor(private matterProvider: MattersProvider) {}

  @Get()
  getMatters() {
    return this.matterProvider.getMatters();
  }

  @Post()
  createMatter(@Body() matterData: CreateMatter) {
    return this.matterProvider.createMatter(matterData);
  }
}
