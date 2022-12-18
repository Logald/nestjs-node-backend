import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { z } from 'zod';
import { MG } from './mg.entity';
import { MGProvider } from './mgs.service';
import { CreateMg } from './schemas/create_mg.schema';
import { UpdateMg } from './schemas/update_mg.schema';

@Controller('mgs')
export class MGController {
  constructor(private mgProvider: MGProvider) {}

  @Post()
  getMgs(@Body() mgsFindManyOptions: MG) {
    return this.mgProvider.getMgs(mgsFindManyOptions);
  }

  @Post('/all')
  getMgsWithRelations(@Body() mgsFindManyOptions: MG) {
    return this.mgProvider.getMgsWithRelations(mgsFindManyOptions);
  }

  @Post('/create')
  createMg(@Body() mgData: z.infer<typeof CreateMg>) {
    return this.mgProvider.createMg(mgData);
  }

  @Post('/:mgId')
  getMg(@Param('mgId') mgId: number) {
    return this.mgProvider.getMg(mgId);
  }

  @Post('/:mgId/all')
  getMgWithRelations(@Param('mgId') mgId: number) {
    return this.mgProvider.getMgWithRelations(mgId);
  }

  @Patch('/:mgId')
  updateMg(
    @Param('mgId') mgId: number,
    @Body() mgData: z.infer<typeof UpdateMg>,
  ) {
    return this.mgProvider.updateMg(mgId, mgData);
  }

  @Delete('/:mgId')
  deleteMg(@Param('mgId') mgId: number) {
    return this.mgProvider.deleteMg(mgId);
  }
}
