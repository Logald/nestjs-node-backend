import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { z } from 'zod';
import { Profile } from './profile.entity';
import { CreateProfile } from './schemas/create_profile.schema';

@Injectable()
export class ProfilesProvider {
  constructor(
    @InjectRepository(Profile) private profilesService: Repository<Profile>,
  ) {}

  async createProfile(profileData: z.infer<typeof CreateProfile>) {
    const passFormat = CreateProfile.safeParse(profileData);
    if (!passFormat.success)
      return new HttpException('Invalid format', HttpStatus.NOT_ACCEPTABLE);
    profileData = passFormat.data;
    return await this.profilesService.insert(profileData).catch(() => {
      return new HttpException('Profile found', HttpStatus.FOUND);
    });
  }
}
