import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { z } from 'zod';
import { Matter } from './matter.entity';
import { MattersProvider } from './matters.service';
import { CreateMatter } from './schemas/create_matter.schema';
import { UpdateMatter } from './schemas/update_matter.schema';

@Controller('matters')
export class MattersController {
  constructor(private matterProvider: MattersProvider) {}

  @Post()
  getMatters(@Body() findMatterOptions: Matter) {
    return this.matterProvider.getMatters(findMatterOptions);
  }

  @Post()
  createMatter(@Body() matterData: z.infer<typeof CreateMatter>) {
    return this.matterProvider.createMatter(matterData);
  }

  @Get('/:id')
  getMatter(@Param('id') matterId: number) {
    return this.matterProvider.getMatter(matterId);
  }

  @Patch('/:id')
  updateMatter(
    @Param('id') matterId: number,
    @Body() matterData: z.infer<typeof UpdateMatter>,
  ) {
    return this.matterProvider.updateMatter(matterId, matterData);
  }

  @Delete('/:id')
  deleteMatter(@Param('id') matterId: number) {
    return this.matterProvider.deleteMatter(matterId);
  }
}
