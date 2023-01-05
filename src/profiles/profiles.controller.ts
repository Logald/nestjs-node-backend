import { Body, Controller, Post } from '@nestjs/common';
import { z } from 'zod';
import { ProfilesProvider } from './profiles.service';
import { CreateProfile } from './schemas/create_profile.schema';

@Controller('profiles')
export class ProfilesController {
  constructor(private profilesProvider: ProfilesProvider) {}

  @Post('/create')
  createProfile(@Body() profileData: z.infer<typeof CreateProfile>) {
    return this.profilesProvider.createProfile(profileData);
  }
}
