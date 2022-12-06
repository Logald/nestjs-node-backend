import { Body, Controller, Get, Post } from '@nestjs/common';
import { MG } from './mg.entity';
import { MGProvider } from './mgs.service';

@Controller('mgs')
export class MGController {
  constructor(private mgProvider: MGProvider) {}

  @Get()
  getMgs() {
    return this.mgProvider.getMgs();
  }

  @Post()
  createMg(@Body() mgData: Omit<MG, 'id'>) {
    return this.mgProvider.createMg(mgData);
  }
}
