import { Body, Controller, Post } from "@nestjs/common";
import { z } from "zod";
import { CreateUser } from "./schemas/create_user.schema";
import { UsersProvider } from "./users.service";

@Controller('users')
export class UsersController {
  constructor(
    private usersProvider: UsersProvider
  ) {}

  @Post('/signup')
  signUp(@Body() userData: z.infer<typeof CreateUser>) {
    return this.usersProvider.signUp(userData)
  }
}