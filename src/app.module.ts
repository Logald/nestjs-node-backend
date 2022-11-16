import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MattersModule } from './matters/matters.module';
import { TurnsModule } from './turns/turns.module';

@Module({
  imports: [
    MattersModule,
    TurnsModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env['MYSQL_HOST'] || 'localhost',
      port: parseInt(process.env['MYSQL_PORT']) || 3306,
      username: process.env['MYSQL_USER'] || 'root',
      password: process.env['MYSQL_PASSWORD'] || '',
      database: process.env['MYSQL_DATABASE'] || 'prueba',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: process.env['NODE_ENV'] == 'development' ? true : false,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
