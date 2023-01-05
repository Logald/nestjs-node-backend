import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { compare, hash } from "bcrypt";
import { Person } from "src/people/person.entity";
import { Profile } from "src/profiles/profile.entity";
import { FindOneOptions, Repository } from "typeorm";
import { z } from "zod";
import { CreateUser } from "./schemas/create_user.schema";
import { Login } from "./schemas/login.schema";
import { UpdateUser } from "./schemas/update_user.schema";
import { User } from "./user.entity";

@Injectable()
export class UsersProvider {
  constructor(
    @InjectRepository(User) private usersService: Repository<User>,
    @InjectRepository(Person) private peopleService: Repository<Person>,
    @InjectRepository(Profile) private profilesService: Repository<Profile>,
    private JwtService: JwtService
  ) {}

  private async findOne(findOneOptions: FindOneOptions) {
    const userFound = await this.usersService.findOne(findOneOptions)
    if (!userFound) throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    return userFound;
  }

  async getUser(userId: number) {
    return await this.findOne({where: {id: userId}})
  }

  async getUserWithRelations(userId: number) {
    return await this.findOne({where: {id: userId}, relations: [ 'person','profile']})
  }

  async getUsers(findManyOptions: User) {
    return await this.usersService.find({where: findManyOptions})
  }

  async getUsersWithRelations(findManyOptions: User) {
    return await this.usersService.find({where: findManyOptions, relations: ['person', 'profile']})
  }

  async signIn(userData: z.infer<typeof Login>) {
    const passFormat = Login.safeParse(userData);
    if (!passFormat.success) throw new HttpException('Invalid format', HttpStatus.NOT_ACCEPTABLE);
    userData = passFormat.data;
    const userFound = await this.usersService.findOne({where: {person: {ci: userData.ci}}, relations: ['person']})
    if (!userFound) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    const checkPassword = await compare(userData.password, userFound.password)
    if (!checkPassword) throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED) 
    const payload = {id: userFound.id, name: userFound.person.name, lastname: userFound.person.lastname}
    const token = this.JwtService.sign(payload, {secret: process.env['JWT_SECRET'] ?? '1234', expiresIn: '7d'})
    return {token};
  }

  async signUp(userData: z.infer<typeof CreateUser>) {
    const passFormat = CreateUser.safeParse(userData)
    if (!passFormat.success) throw new HttpException('Invalid format', HttpStatus.NOT_ACCEPTABLE)
      let {password} = passFormat.data;
    password = await hash(password, 10);
    userData = {...passFormat.data, password}
    const personFound = await this.peopleService.findOne({where: {id: userData.personId}})
    if (!personFound) throw new HttpException('Person not found', HttpStatus.FOUND)
    const profileFound = await this.profilesService.findOne({where: {id: userData.profileId}})
    if (!profileFound) throw new HttpException('Profile not found', HttpStatus.FOUND)
    const userFound = await this.usersService.findOne({where: {personId: userData.personId}})
    if (userFound) throw new HttpException('User found', HttpStatus.FOUND)
    return await this.usersService.insert(userData);
  }

  async updateUser(userId: number, userData: z.infer<typeof UpdateUser>) {
    const passFormat = UpdateUser.safeParse(userData)
    if (!passFormat.success) throw new HttpException('Invalid format', HttpStatus.NOT_ACCEPTABLE)
    if (Object.keys(passFormat.data).length == 0) throw new HttpException('Empty object', HttpStatus.NOT_ACCEPTABLE)
    if ('password' in passFormat.data) {
      let {password} = passFormat.data;
      password = await hash(password, 10);
      userData = {...passFormat.data, password}
    }
    if ('personId' in userData) {
      const personFound = await this.peopleService.findOne({where: {id: userData.personId}})
      if (!personFound) throw new HttpException('Person not found', HttpStatus.FOUND)
      const userFound = await this.usersService.findOne({where: {personId: userData.personId}})
      if (userFound) throw new HttpException('User found', HttpStatus.FOUND)
    }
    if ('profileId' in userData) {
      const profileFound = await this.profilesService.findOne({where: {id: userData.profileId}})
      if (!profileFound) throw new HttpException('Profile not found', HttpStatus.FOUND)
    }
    const updateResult = await this.usersService.update(userId, userData);
    if (updateResult.affected == 0) throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    return updateResult;
  }

  async deleteUser(userId: number) {
    const userFound = await this.usersService.delete(userId)
    if (userFound.affected == 0) throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    return userFound;
  }
}