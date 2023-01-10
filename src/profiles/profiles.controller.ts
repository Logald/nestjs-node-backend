import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards
} from '@nestjs/common'
import { AccessTokenGuard } from 'src/users/accessTokenGuard'
import { CreateProfileDto } from './dtos/create_profile.dto'
import { FindProfileDto } from './dtos/find_profile.dto'
import { UpdateProfileDto } from './dtos/update_profile.dto'
import { ProfilesProvider } from './profiles.service'

@Controller('profiles')
export class ProfilesController {
  constructor (private readonly profilesProvider: ProfilesProvider) {}

  @Post()
  async getProfiles (@Body() findManyOptions: FindProfileDto) {
    return await this.profilesProvider.getProfiles(findManyOptions)
  }

  @Post('/create')
  async createProfile (@Body() profileData: CreateProfileDto) {
    return await this.profilesProvider.createProfile(profileData)
  }

  @Get('/:id')
  async getProfile (@Param('id', ParseIntPipe) profileId: number) {
    return await this.profilesProvider.getProfile(profileId)
  }

  @UseGuards(AccessTokenGuard)
  @Patch('/:id')
  async updateProfile (
  @Param('id', ParseIntPipe) profileId: number,
    @Body() profileData: UpdateProfileDto
  ) {
    return await this.profilesProvider.updateProfile(profileId, profileData)
  }

  @UseGuards(AccessTokenGuard)
  @Delete('/:id')
  async deleteProfile (@Param('id', ParseIntPipe) profileId: number) {
    return await this.profilesProvider.deleteProfile(profileId)
  }
}
