import { Body, Controller, Post } from '@nestjs/common';
import { MG } from './mg.entity';
import { MGProvider } from './mgs.service';

@Controller('mgs')
export class MGController {
  constructor(private mgProvider: MGProvider) {}

  @Post()
  createMg(@Body() mgData: Omit<MG, 'id'>) {
    return this.mgProvider.createMg(mgData);
  }
}
