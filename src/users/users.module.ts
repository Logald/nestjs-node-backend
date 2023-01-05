import { Module } from "@nestjs/common";
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Person } from "src/people/person.entity";
import { Profile } from "src/profiles/profile.entity";
import { AccessTokenStrategy } from "./accessToken.strategy";
import { User } from "./user.entity";
import { UsersController } from "./users.controller";
import { UsersProvider } from "./users.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Profile, Person]),
    JwtModule.register({})
  ],
  controllers: [UsersController],
  providers: [UsersProvider, AccessTokenStrategy]
})
export class UsersModule {}