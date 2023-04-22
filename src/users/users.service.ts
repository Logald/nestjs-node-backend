import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create_user.dto';
import { FindUserDto } from './dtos/find_user.dto';
import { LoginDto } from './dtos/login.dto';
import { UpdateUserDto } from './dtos/update_user.dto';
import { User } from './user.entity';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, hash } from 'bcrypt';
import { isEmpty } from 'src/utils/empty_object.utils';
import {
  invalidPasswordError,
  userFoundError,
  userNotFoundError
} from 'src/utils/errors.utils';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class UsersProvider {
  constructor(
    @InjectRepository(User) private readonly usersService: Repository<User>,
    private readonly JwtService: JwtService
  ) { }

  public async createUserAdminIfNotExist() {
    const admin = {
      name: 'admin',
      password: await hash('admin2023', 10)
    }
    const user = await this.usersService.findOne({ where: { name: admin.name } });
    if (!user)
      this.usersService.insert(admin);
  }

  private async checkPassword(password: string, encryptPassword: string) {
    const checkPassword = await compare(password, encryptPassword);
    if (!checkPassword) invalidPasswordError();
  }

  private createToken(payload: Object) {
    return this.JwtService.sign(payload, {
      secret: process.env.JWT_SECRET ?? '1234',
      expiresIn: '7d',
    });
  }

  async findOne(findOneOptions: FindOneOptions<User>, found: boolean = true) {
    const userFound = await this.usersService.findOne(findOneOptions);
    if (found && !userFound) userNotFoundError();
    else if (!found && userFound) userFoundError();
    else return userFound;
  }

  async getUser(userId: number) {
    return await this.findOne({ where: { id: userId }, select: ['id', 'name', 'active'] });
  }

  async getUsers(findManyOptions: FindUserDto) {
    return await this.usersService.find({ where: findManyOptions, select: ['id', 'name', 'active'] });
  }

  async signIn(userData: LoginDto) {
    const userFound = await this.findOne({
      where: { name: userData.name }
    });
    await this.checkPassword(userData.password, userFound.password);
    const payload = {
      id: userFound.id,
      name: userFound.name
    };
    return { token: this.createToken(payload) };
  }

  async signUp(userData: CreateUserDto) {
    userData.password = await hash(userData.password, 10);
    await this.findOne({ where: { name: userData.name } }, false);
    await this.usersService.insert(userData);
    return await this.signIn({ name: userData.name, password: userData.password });
  }

  async updateUser(userId: number, userData: UpdateUserDto) {
    await this.findOne({ where: { id: userId } });
    isEmpty(userData);
    if ('name' in userData)
      await this.findOne({ where: { name: userData.name } }, false);
    if ('password' in userData)
      userData.password = await hash(userData.password, 10);
    await this.usersService.update(userId, userData);
    return true;
  }

  async deleteUser(userId: number) {
    await this.findOne({ where: { id: userId } });
    await this.usersService.delete(userId);
    return true;
  }
}
