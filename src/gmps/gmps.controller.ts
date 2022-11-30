import { Body, Controller, Get, Post } from '@nestjs/common';
import { Gmp } from './gmp.entity';
import { GmpsProvider } from './gmps.service';

@Controller('gmps')
export class GmpsController {
  constructor(private gmpsProvider: GmpsProvider) {}

  @Get()
  getGmps() {
    return this.gmpsProvider.getGmps();
  }

  @Post()
  createGmp(@Body() gmpData: Omit<Gmp, 'id'>) {
    return this.gmpsProvider.createGmp(gmpData);
  }
}
