import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards
} from '@nestjs/common'
import { AccessTokenGuard } from 'src/users/accessTokenGuard'
import { z } from 'zod'
import { Profile } from './profile.entity'
import { ProfilesProvider } from './profiles.service'
import { CreateProfile } from './schemas/create_profile.schema'
import { UpdateProfile } from './schemas/update_profile.schema'

@Controller('profiles')
export class ProfilesController {
  constructor (private readonly profilesProvider: ProfilesProvider) {}

  @Post()
  async getProfiles (@Body() findManyOptions: Profile) {
    return await this.profilesProvider.getProfiles(findManyOptions)
  }

  @Post('/create')
  async createProfile (@Body() profileData: z.infer<typeof CreateProfile>) {
    return await this.profilesProvider.createProfile(profileData)
  }

  @Get('/:id')
  async getProfile (@Param('id') profileId: number) {
    return await this.profilesProvider.getProfile(profileId)
  }

  @UseGuards(AccessTokenGuard)
  @Patch('/:id')
  async updateProfile (
  @Param('id') profileId: number,
    @Body() profileData: z.infer<typeof UpdateProfile>
  ) {
    return await this.profilesProvider.updateProfile(profileId, profileData)
  }

  @UseGuards(AccessTokenGuard)
  @Delete('/:id')
  async deleteProfile (@Param('id') profileId: number) {
    return await this.profilesProvider.deleteProfile(profileId)
  }
}
