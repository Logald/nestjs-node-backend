import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { z } from 'zod'
import { Profile } from './profile.entity'
import { CreateProfile } from './schemas/create_profile.schema'
import { UpdateProfile } from './schemas/update_profile.schema'

@Injectable()
export class ProfilesProvider {
  constructor (
    @InjectRepository(Profile) private readonly profilesService: Repository<Profile>
  ) {}

  async getProfiles (findManyOptions: Profile) {
    return await this.profilesService.find({ where: findManyOptions })
  }

  async getProfile (profileId: number) {
    const profileFound = await this.profilesService.findOne({
      where: { id: profileId }
    })
    if (!profileFound) { throw new HttpException('Profile not found', HttpStatus.NOT_FOUND) }
    return profileFound
  }

  async createProfile (profileData: z.infer<typeof CreateProfile>) {
    const passFormat = CreateProfile.safeParse(profileData)
    if (!passFormat.success) { throw new HttpException('Invalid format', HttpStatus.NOT_ACCEPTABLE) }
    profileData = passFormat.data
    return await this.profilesService.insert(profileData).catch(() => {
      throw new HttpException('Profile found', HttpStatus.FOUND)
    })
  }

  async updateProfile (
    profileId: number,
    profileData: z.infer<typeof UpdateProfile>
  ) {
    const passFormat = UpdateProfile.safeParse(profileData)
    if (!passFormat.success) { throw new HttpException('Invalid format', HttpStatus.NOT_ACCEPTABLE) }
    profileData = passFormat.data
    const profileFound = await this.profilesService.findOne({
      where: { type: profileData.type }
    })
    if (profileFound) { throw new HttpException('Profile found', HttpStatus.FOUND) }
    return await this.profilesService
      .update(profileId, profileData)
      .then((res) => {
        if (res.affected == 0) { throw new HttpException('Profile not found', HttpStatus.NOT_FOUND) }
        return res
      })
  }

  async deleteProfile (profileId: number) {
    return await this.profilesService.delete(profileId).then((res) => {
      if (res.affected == 0) { throw new HttpException('Profile not found', HttpStatus.NOT_FOUND) }
      return res
    })
  }
}
