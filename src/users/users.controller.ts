import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
  UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from './accessTokenGuard';
import { CreateUserDto } from './dtos/create_user.dto';
import { FindUserDto } from './dtos/find_user.dto';
import { LoginDto } from './dtos/login.dto';
import { UpdateUserDto } from './dtos/update_user.dto';
import { UsersProvider } from './users.service';
import { Response } from 'express';
@ApiTags('api/users')
@Controller('api/users')
export class UsersController {
  constructor (private readonly usersProvider: UsersProvider) { }

  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @Post()
  async getUsers (@Body() findManyOptions: FindUserDto) {
    return await this.usersProvider.getUsers(findManyOptions);
  }

  @Post('/signin')
  async signIn (@Body() userData: LoginDto) {
    return await this.usersProvider.signIn(userData);
  }

  @Post('/signup')
  async signUp (@Body() userData: CreateUserDto) {
    return await this.usersProvider.signUp(userData);
  }

  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @Get('/:id')
  async getUser (@Param('id', ParseIntPipe) userId: number) {
    return await this.usersProvider.getUser(userId);
  }

  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @Put('/:id')
  async updateUser (
  @Param('id', ParseIntPipe) userId: number,
    @Body() userData: UpdateUserDto,
    @Res() res: Response
  ) {
    return res.json(await this.usersProvider.updateUser(userId, userData));
  }

  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @Delete('/:id')
  async deleteUser (
  @Param('id', ParseIntPipe) userId: number,
    @Res() res: Response
  ) {
    return res.json(await this.usersProvider.deleteUser(userId));
  }
}
