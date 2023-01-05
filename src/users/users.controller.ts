import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { z } from "zod";
import { CreateUser } from "./schemas/create_user.schema";
import { Login } from "./schemas/login.schema";
import { User } from "./user.entity";
import { UsersProvider } from "./users.service";

@Controller('users')
export class UsersController {
  constructor(
    private usersProvider: UsersProvider
  ) {}

  @Post()
  getUsers(@Body() findManyOptions: User) {
    return this.usersProvider.getUsers(findManyOptions)
  }

  @Post('/all')
  getUsersWithRelations(@Body() findManyOptions: User) {
    return this.usersProvider.getUsersWithRelations(findManyOptions)
  }

  @Post('/signin')
  signIn(@Body() userData: z.infer<typeof Login>) {
    return this.usersProvider.signIn(userData)
  }

  @Post('/signup')
  signUp(@Body() userData: z.infer<typeof CreateUser>) {
    return this.usersProvider.signUp(userData)
  }

  @Get('/:id')
  getUser(@Param('id') userId: number) {
    return this.usersProvider.getUser(userId)
  }

  @Get('/:id/all')
  getUserWithRelations(@Param('id') userId: number) {
    return this.usersProvider.getUserWithRelations(userId)
  }

  @Patch('/:id')
  updateUser(@Param('id') userId: number, @Body() userData: User) {
    return this.usersProvider.updateUser(userId, userData);
  }

  @Delete('/:id')
  deleteUser(@Param('id') userId: number) {
    return this.usersProvider.deleteUser(userId);
  }
}