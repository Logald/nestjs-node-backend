import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { z } from 'zod';
import { Gmp } from './gmp.entity';
import { GmpsProvider } from './gmps.service';
import { CreateGmp } from './schemas/create_gmp.schema';
import { UpdateGmp } from './schemas/update_gmp.schema';

@Controller('gmps')
export class GmpsController {
  constructor(private gmpsProvider: GmpsProvider) {}

  @Post()
  getGmpsByJson(@Body() gmpsFindManyOptions: Gmp) {
    return this.gmpsProvider.getGmps(gmpsFindManyOptions);
  }

  @Post('/all')
  getGmpsWithRelationsByJson(@Body() gmpsFindManyOptions: Gmp) {
    return this.gmpsProvider.getGmpsWithRelations(gmpsFindManyOptions);
  }

  @Post('/create')
  createGmp(@Body() gmpData: z.infer<typeof CreateGmp>) {
    return this.gmpsProvider.createGmp(gmpData);
  }

  @Get('/:id')
  getGmp(@Param('id') gmpId: number) {
    return this.gmpsProvider.getGmp(gmpId);
  }

  @Get('/:id/all')
  getGmpWithRelations(@Param('id') gmpId: number) {
    return this.gmpsProvider.getGmpWithRelations(gmpId);
  }

  @Patch('/:gmpId')
  updateGmp(
    @Param('gmpId') gmpId: number,
    @Body() gmpData: z.infer<typeof UpdateGmp>,
  ) {
    return this.gmpsProvider.updateGmp(gmpId, gmpData);
  }

  @Delete('/:gmpId')
  deleteGmp(@Param('gmpId') gmpId: number) {
    return this.gmpsProvider.deleteGmp(gmpId);
  }
}
