import { UseGuards } from '@nestjs/common';
import {
  Args,
  Int,
  Mutation, Query, Resolver
} from '@nestjs/graphql';
import { CreateUserDto } from './dtos/create_user.dto';
import { FindUserDto } from './dtos/find_user.dto';
import { LoginDto } from './dtos/login.dto';
import { LoginResponseDto } from './dtos/login_response';
import { UpdateUserDto } from './dtos/update_user.dto';
import { GraphAuthGuard } from './graphAuthguard';
import { User } from './user.entity';
import { UsersProvider } from './users.service';

@Resolver(of => User)
export class UsersResolver {
  constructor(
    private readonly usersProvider: UsersProvider
  ) { }

  @UseGuards(GraphAuthGuard)
  @Query(() => [User])
  async getUsers(
    @Args({ name: 'findOptions', nullable: true, type: () => FindUserDto }) findOptions?: FindUserDto,
  ) {
    return await this.usersProvider.getUsers(findOptions);
  }

  @UseGuards(GraphAuthGuard)
  @Query(() => User)
  async getUser(@Args({ name: "userId", type: () => Int }) userId: number) {
    return await this.usersProvider.getUser(userId);
  }

  @Mutation(() => LoginResponseDto)
  async signIn(
    @Args({ name: 'loginData', type: () => LoginDto }) loginData: LoginDto,
  ) {
    return await this.usersProvider.signIn(loginData);
  }

  @Mutation(() => Boolean)
  async signUp(
    @Args({ name: 'userData', type: () => CreateUserDto }) userData: CreateUserDto,
  ) {
    return await this.usersProvider.signUp(userData);
  }

  @UseGuards(GraphAuthGuard)
  @Mutation(() => Boolean)
  async updateUser(
    @Args({ name: "userId", type: () => Int }) userId: number,
    @Args({ name: 'userData', type: () => UpdateUserDto }) userData: UpdateUserDto,
  ) {
    return await this.usersProvider.updateUser(userId, userData);
  }

  @UseGuards(GraphAuthGuard)
  @Mutation(() => Boolean)
  async deleteUser(@Args({ name: "userId", type: () => Int }) userId: number) {
    return await this.usersProvider.deleteUser(userId);
  }
}
