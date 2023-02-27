import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessTokenStrategy } from './accessToken.strategy';
import { GraphAuthGuard } from './graphAuthguard';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersResolver } from './users.resolver';
import { UsersProvider } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({})
  ],
  controllers: [UsersController],
  providers: [UsersProvider, AccessTokenStrategy, UsersResolver, GraphAuthGuard]
})
export class UsersModule { }
