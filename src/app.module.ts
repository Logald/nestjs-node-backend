import { Module } from '@nestjs/common';
import { MattersModule } from './matters/matters.module';

@Module({
  imports: [MattersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
