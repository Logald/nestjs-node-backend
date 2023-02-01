import { UseGuards } from "@nestjs/common";
import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { TurnsProvider } from "src/turns/turns.service";
import { GraphAuthGuard } from "src/users/graphAuthguard";
import { CreateGroupDto } from "./dtos/create_group.dto";
import { FindGroupDto } from "./dtos/find_group.dto";
import { UpdateGroupDto } from "./dtos/update_group.dto";
import { Group } from "./group.entity";
import { GroupsProvider } from "./groups.service";

@Resolver(of => Group)
export class GroupsResolver {
  constructor(
    private groupsProvider: GroupsProvider,
    private turnsProvider: TurnsProvider
  ) { }

  @ResolveField()
  async turn(@Parent() group: Group) {
    return await this.turnsProvider.getTurn(group.turnId)
  }

  @UseGuards(GraphAuthGuard)
  @Query(() => [Group])
  async getGroups(
    @Args({ name: 'findOptions', nullable: true, type: () => FindGroupDto }) findOptions?: FindGroupDto
  ) {
    return await this.groupsProvider.getGroups(findOptions)
  }

  @UseGuards(GraphAuthGuard)
  @Query(() => Group)
  async getGroup(
    @Args({ name: 'groupId', type: () => Int }) groupId: number
  ) {
    return await this.groupsProvider.getGroup(groupId)
  }

  @UseGuards(GraphAuthGuard)
  @Mutation(() => Boolean)
  async createGroup(
    @Args({ name: 'groupData', type: () => CreateGroupDto }) groupData: CreateGroupDto
  ) {
    await this.groupsProvider.createGroup(groupData)
    return true
  }

  @UseGuards(GraphAuthGuard)
  @Mutation(() => Boolean)
  async updateGroup(
    @Args({ name: 'groupId', type: () => Int }) groupId: number,
    @Args({ name: 'groupData', type: () => UpdateGroupDto }) groupData: UpdateGroupDto
  ) {
    await this.groupsProvider.updateGroup(groupId, groupData)
    return true
  }

  @UseGuards(GraphAuthGuard)
  @Mutation(() => Boolean)
  async deleteGroup(
    @Args({ name: 'groupId', type: () => Int }) groupId: number
  ) {
    await this.groupsProvider.deleteGroup(groupId)
    return true
  }
}