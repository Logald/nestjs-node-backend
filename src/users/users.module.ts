import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeopleProvider } from 'src/people/people.service';
import { Person } from 'src/people/person.entity';
import { Profile } from 'src/profiles/profile.entity';
import { ProfilesProvider } from 'src/profiles/profiles.service';
import { AccessTokenStrategy } from './accessToken.strategy';
import { GraphAuthGuard } from './graphAuthguard';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersResolver } from './users.resolver';
import { UsersProvider } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Profile, Person]),
    JwtModule.register({})
  ],
  controllers: [UsersController],
  providers: [UsersProvider, AccessTokenStrategy, PeopleProvider, ProfilesProvider, UsersResolver, GraphAuthGuard]
})
export class UsersModule {}
