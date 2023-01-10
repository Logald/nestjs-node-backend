import { Injectable } from '@nestjs/common'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { compare, hash } from 'bcrypt'
import { PeopleProvider } from 'src/people/people.service'
import { Person } from 'src/people/person.entity'
import { Profile } from 'src/profiles/profile.entity'
import { ProfilesProvider } from 'src/profiles/profiles.service'
import { isEmpty } from 'src/utils/empty_object.utils'
import { invalidPasswordError, userFoundError, userNotFoundError } from 'src/utils/errors.utils'
import { FindOneOptions, Repository } from 'typeorm'
import { CreateUserDto } from './dtos/create_user.dto'
import { FindUserDto } from './dtos/find_user.dto'
import { LoginDto } from './dtos/login.dto'
import { UpdateUserDto } from './dtos/update_user.dto'
import { User } from './user.entity'

@Injectable()
export class UsersProvider {
  constructor (
    @InjectRepository(User) private readonly usersService: Repository<User>,
    @InjectRepository(Person) private readonly peopleService: Repository<Person>,
    @InjectRepository(Profile) private readonly profilesService: Repository<Profile>,
    private readonly JwtService: JwtService,
    private readonly profilesProvider: ProfilesProvider,
    private readonly peopleProvider: PeopleProvider
  ) {}

  private async checkPassword (password: string, encryptPassword: string) {
    const checkPassword = await compare(password, encryptPassword)
    if (!checkPassword) invalidPasswordError()
  }

  private createToken (payload: Object) {
    return this.JwtService.sign(payload, { secret: process.env.JWT_SECRET ?? '1234', expiresIn: '7d' })
  }

  async findOne (findOneOptions: FindOneOptions<User>, found: boolean = true) {
    const userFound = await this.usersService.findOne(findOneOptions)
    if (found && !userFound) userNotFoundError()
    else if (!found && userFound) userFoundError()
    else return userFound
  }

  async getUser (userId: number) {
    return await this.findOne({ where: { id: userId } })
  }

  async getUserWithRelations (userId: number) {
    return await this.findOne({ where: { id: userId }, relations: ['person', 'profile'] })
  }

  async getUsers (findManyOptions: FindUserDto) {
    return await this.usersService.find({ where: findManyOptions })
  }

  async getUsersWithRelations (findManyOptions: FindUserDto) {
    return await this.usersService.find({ where: findManyOptions, relations: ['person', 'profile'] })
  }

  async signIn (userData: LoginDto) {
    const userFound = await this.findOne({ where: { person: { ci: userData.ci } }, relations: ['person'] })
    await this.checkPassword(userData.password, userFound.password)
    const payload = { id: userFound.id, name: userFound.person.name, lastname: userFound.person.lastname }
    return { token: this.createToken(payload) }
  }

  async signUp (userData: CreateUserDto) {
    userData.password = await hash(userData.password, 10)
    await this.peopleProvider.findOne({ where: { id: userData.personId } })
    await this.profilesProvider.findOne({ where: { id: userData.profileId } })
    await this.findOne({ where: { personId: userData.personId } }, false)
    return await this.usersService.insert(userData)
  }

  async updateUser (userId: number, userData: UpdateUserDto) {
    await this.findOne({ where: { id: userId } })
    isEmpty(userData)
    if ('password' in userData) userData.password = await hash(userData.password, 10)
    if ('personId' in userData) await this.peopleProvider.findOne({ where: { id: userData.personId } })
    if ('profileId' in userData) await this.profilesProvider.findOne({ where: { id: userData.profileId } })
    return await this.usersService.update(userId, userData)
  }

  async deleteUser (userId: number) {
    await this.findOne({ where: { id: userId } })
    return await this.usersService.delete(userId)
  }
}
