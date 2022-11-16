import { Body, Controller, Post } from '@nestjs/common';
import { CreateMatter } from './dto/creatematter.dto';
import { MattersProvider } from './matters.service';

@Controller('matters')
export class MattersController {
  constructor(private matterProvider: MattersProvider) {}

  @Post()
  createMatter(@Body() matterData: CreateMatter) {
    return this.matterProvider.createMatter(matterData);
  }
}
