import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common'
import { z } from 'zod'
import { AccessTokenGuard } from './accessTokenGuard'
import { CreateUser } from './schemas/create_user.schema'
import { Login } from './schemas/login.schema'
import { User } from './user.entity'
import { UsersProvider } from './users.service'

@Controller('users')
export class UsersController {
  constructor (
    private readonly usersProvider: UsersProvider
  ) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  async getUsers (@Body() findManyOptions: User) {
    return await this.usersProvider.getUsers(findManyOptions)
  }

  @UseGuards(AccessTokenGuard)
  @Post('/all')
  async getUsersWithRelations (@Body() findManyOptions: User) {
    return await this.usersProvider.getUsersWithRelations(findManyOptions)
  }

  @Post('/signin')
  async signIn (@Body() userData: z.infer<typeof Login>) {
    return await this.usersProvider.signIn(userData)
  }

  @Post('/signup')
  async signUp (@Body() userData: z.infer<typeof CreateUser>) {
    return await this.usersProvider.signUp(userData)
  }

  @UseGuards(AccessTokenGuard)
  @Get('/:id')
  async getUser (@Param('id') userId: number) {
    return await this.usersProvider.getUser(userId)
  }

  @UseGuards(AccessTokenGuard)
  @Get('/:id/all')
  async getUserWithRelations (@Param('id') userId: number) {
    return await this.usersProvider.getUserWithRelations(userId)
  }

  @UseGuards(AccessTokenGuard)
  @Patch('/:id')
  async updateUser (@Param('id') userId: number, @Body() userData: User) {
    return await this.usersProvider.updateUser(userId, userData)
  }

  @UseGuards(AccessTokenGuard)
  @Delete('/:id')
  async deleteUser (@Param('id') userId: number) {
    return await this.usersProvider.deleteUser(userId)
  }
}
