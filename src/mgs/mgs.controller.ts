import { Body, Controller, Get, Post } from '@nestjs/common';
import { MG } from './mg.entity';
import { MGProvider } from './mgs.service';

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

  @Post()
  createMg(@Body() mgData: Omit<MG, 'id'>) {
    return this.mgProvider.createMg(mgData);
  }
}
