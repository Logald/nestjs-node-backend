import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { profileFoundError, profileNotFoundError } from 'src/utils/errors.utils'
import { FindOneOptions, Repository } from 'typeorm'
import { CreateProfileDto } from './dtos/create_profile.dto'
import { UpdateProfileDto } from './dtos/update_profile.dto'
import { Profile } from './profile.entity'
@Injectable()
export class ProfilesProvider {
  constructor (
    @InjectRepository(Profile) private readonly profilesService: Repository<Profile>
  ) {}

  async findOne (findOneOptions: FindOneOptions<Profile>, found: boolean = true) {
    const profileFound = await this.profilesService.findOne(findOneOptions)
    if (found && !profileFound) profileNotFoundError()
    else if (!found && profileFound) profileFoundError()
    else return profileFound
  }

  async getProfiles (findManyOptions: Profile) {
    return await this.profilesService.find({ where: findManyOptions })
  }

  async getProfile (profileId: number) {
    return await this.findOne({ where: { id: profileId } })
  }

  async createProfile (profileData: CreateProfileDto) {
    await this.findOne({ where: { type: profileData.type } }, false)
    return await this.profilesService.insert(profileData)
  }

  async updateProfile (
    profileId: number,
    profileData: UpdateProfileDto
  ) {
    await this.findOne({ where: { id: profileId } })
    await this.findOne({ where: { type: profileData.type } }, false)
    return await this.profilesService.update(profileId, profileData)
  }

  async deleteProfile (profileId: number) {
    await this.findOne({ where: { id: profileId } })
    return await this.profilesService.delete(profileId)
  }
}
