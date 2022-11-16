import { Module } from '@nestjs/common';
import { MattersController } from './matters.controller';
import { MattersProvider } from './matters.service';

@Module({
  imports: [],
  controllers: [MattersController],
  providers: [MattersProvider],
})
export class MattersModule {}
