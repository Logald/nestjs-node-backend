import { UseGuards } from "@nestjs/common";
import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GraphAuthGuard } from "src/users/graphAuthguard";
import { CreateProfileDto } from "./dtos/create_profile.dto";
import { FindProfileDto } from "./dtos/find_profile.dto";
import { UpdateProfileDto } from "./dtos/update_profile.dto";
import { Profile } from "./profile.entity";
import { ProfilesProvider } from "./profiles.service";

@Resolver()
export class ProfilesResolver {
  constructor(private profilesProvider: ProfilesProvider) { }

  @Query(() => [Profile])
  async getProfiles(
    @Args({ name: 'findOptions', nullable: true, type: () => FindProfileDto }) findOptions?: FindProfileDto
  ) {
    return await this.profilesProvider.getProfiles(findOptions)
  }

  @Query(() => Profile)
  async getProfile(
    @Args({ name: 'profileId', type: () => Int }) profileId: number
  ) {
    return await this.profilesProvider.getProfile(profileId)
  }

  @Mutation(() => Boolean)
  async createProfile(
    @Args({ name: 'profileData', type: () => CreateProfileDto }) profileData: CreateProfileDto
  ) {
    await this.profilesProvider.createProfile(profileData)
    return true
  }

  @UseGuards(GraphAuthGuard)
  @Mutation(() => Boolean)
  async updateProfile(
    @Args({ name: 'profileId', type: () => Int }) profileId: number,
    @Args({ name: 'profileData', type: () => UpdateProfileDto }) profileData: UpdateProfileDto
  ) {
    await this.profilesProvider.updateProfile(profileId, profileData)
    return true
  }

  @UseGuards(GraphAuthGuard)
  @Mutation(() => Boolean)
  async deleteProfile(
    @Args({ name: 'profileId', type: () => Int }) profileId: number
  ) {
    await this.profilesProvider.deleteProfile(profileId)
    return true
  }
}