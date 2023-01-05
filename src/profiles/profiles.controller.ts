import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { z } from 'zod';
import { Profile } from './profile.entity';
import { ProfilesProvider } from './profiles.service';
import { CreateProfile } from './schemas/create_profile.schema';
import { UpdateProfile } from './schemas/update_profile.schema';

@Controller('profiles')
export class ProfilesController {
  constructor(private profilesProvider: ProfilesProvider) {}

  @Post()
  getProfiles(@Body() findManyOptions: Profile) {
    return this.profilesProvider.getProfiles(findManyOptions);
  }

  @Post('/create')
  createProfile(@Body() profileData: z.infer<typeof CreateProfile>) {
    return this.profilesProvider.createProfile(profileData);
  }

  @Get('/:id')
  getProfile(@Param('id') profileId: number) {
    return this.profilesProvider.getProfile(profileId);
  }

  @Patch('/:id')
  updateProfile(
    @Param('id') profileId: number,
    @Body() profileData: z.infer<typeof UpdateProfile>,
  ) {
    return this.profilesProvider.updateProfile(profileId, profileData);
  }
}
