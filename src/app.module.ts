import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MattersModule } from './matters/matters.module';

@Module({
  imports: [
    MattersModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env['MYSQL_HOST'] || 'localhost',
      port: parseInt(process.env['MYSQL_PORT']) || 3306,
      username: process.env['MYSQL_USER'] || 'root',
      password: process.env['MYSQL_PASSWORD'] || '',
      database: process.env['MYSQL_DATABASE'] || 'prueba',
      entities: [__dirname + '/**/*{.ts,.js}'],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
