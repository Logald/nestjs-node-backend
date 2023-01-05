import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { hash } from "bcrypt";
import { Person } from "src/people/person.entity";
import { Profile } from "src/profiles/profile.entity";
import { Repository } from "typeorm";
import { z } from "zod";
import { CreateUser } from "./schemas/create_user.schema";
import { User } from "./user.entity";

@Injectable()
export class UsersProvider {
  constructor(
    @InjectRepository(User) private usersService: Repository<User>,
    @InjectRepository(Person) private peopleService: Repository<Person>,
    @InjectRepository(Profile) private profilesService: Repository<Profile>
  ) {}

  async signUp(userData: z.infer<typeof CreateUser>) {
    const passFormat = CreateUser.safeParse(userData)
    if (!passFormat.success) return new HttpException('Invalid format', HttpStatus.NOT_ACCEPTABLE)
      let {password} = passFormat.data;
    password = await hash(password, 10);
    userData = {...passFormat.data, password}
    const personFound = await this.peopleService.findOne({where: {id: userData.personId}})
    if (!personFound) return new HttpException('Person not found', HttpStatus.FOUND)
    const profileFound = await this.profilesService.findOne({where: {id: userData.profileId}})
    if (!profileFound) return new HttpException('Profile not found', HttpStatus.FOUND)
    const userFound = await this.usersService.findOne({where: {personId: userData.personId}})
    if (userFound) return new HttpException('User found', HttpStatus.FOUND)
    return await this.usersService.insert(userData);
  }
}