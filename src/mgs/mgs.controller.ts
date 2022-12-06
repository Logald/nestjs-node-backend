import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { z } from 'zod';
import { MG } from './mg.entity';
import { MGProvider } from './mgs.service';
import { CreateMg } from './schema/create_mg.schema';
import { UpdateMg } from './schema/update_mg.schema';

@Controller('mgs')
export class MGController {
  constructor(private mgProvider: MGProvider) {}

  @Get()
  getMgs(@Body() mgsFindManyOptions: MG) {
    return this.mgProvider.getMgs(mgsFindManyOptions);
  }

  @Get('/all')
  getMgsWithRelations(@Body() mgsFindManyOptions: MG) {
    return this.mgProvider.getMgsWithRelations(mgsFindManyOptions);
  }

  @Get('/:mgId')
  getMg(@Param('mgId') mgId: number) {
    return this.mgProvider.getMg(mgId);
  }

  @Get('/:mgId/all')
  getMgWithRelations(@Param('mgId') mgId: number) {
    return this.mgProvider.getMgWithRelations(mgId);
  }

  @Post()
  createMg(@Body() mgData: z.infer<typeof CreateMg>) {
    return this.mgProvider.createMg(mgData);
  }

  @Patch('/:mgId')
  updateMg(
    @Param('mgId') mgId: number,
    @Body() mgData: z.infer<typeof UpdateMg>,
  ) {
    return this.mgProvider.updateMg(mgId, mgData);
  }
}
