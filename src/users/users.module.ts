import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Person } from "src/people/person.entity";
import { Profile } from "src/profiles/profile.entity";
import { User } from "./user.entity";
import { UsersController } from "./users.controller";
import { UsersProvider } from "./users.service";

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile, Person])],
  controllers: [UsersController],
  providers: [UsersProvider]
})
export class UsersModule {}