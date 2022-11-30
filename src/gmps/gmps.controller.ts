import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Gmp } from './gmp.entity';
import { GmpsProvider } from './gmps.service';

@Controller('gmps')
export class GmpsController {
  constructor(private gmpsProvider: GmpsProvider) {}

  @Get()
  getGmps() {
    return this.gmpsProvider.getGmps();
  }

  @Get('/matter/:matterId')
  getGmpsWithMatterId(@Param('matterId') matterId: number) {
    return this.gmpsProvider.getGmpsWithMatterId(matterId);
  }

  @Get('/all')
  getGmpsWithRelations() {
    return this.gmpsProvider.getGmpsWithRelations();
  }

  @Get('/:id')
  getGmp(@Param('id') gmpId: number) {
    return this.gmpsProvider.getGmp(gmpId);
  }

  @Post()
  createGmp(@Body() gmpData: Omit<Gmp, 'id'>) {
    return this.gmpsProvider.createGmp(gmpData);
  }
}
