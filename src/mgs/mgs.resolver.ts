import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { GroupsProvider } from 'src/groups/groups.service';
import { MattersProvider } from 'src/matters/matters.service';
import { MGProvider } from 'src/mgs/mgs.service';
import { GraphAuthGuard } from 'src/users/graphAuthguard';
import { CreateMgDto } from './dtos/create_mg.dto';
import { FindMgDto } from './dtos/find_mg.dto';
import { UpdateMgDto } from './dtos/update_mg.dto';
import { MG } from './mg.entity';

@Resolver(of => MG)
export class MGResolver {
  constructor (
    private readonly mattersProvider: MattersProvider,
    private readonly groupsProvider: GroupsProvider,
    private readonly mgsProvider: MGProvider
  ) { }

  @ResolveField()
  async group (@Parent() mg: MG) {
    return await this.groupsProvider.getGroup(mg.groupId)
  }

  @ResolveField()
  async matter (@Parent() mg: MG) {
    return await this.mattersProvider.getMatter(mg.matterId)
  }

  @UseGuards(GraphAuthGuard)
  @Query(() => [MG])
  async getMgs (
  @Args({ name: 'findOptions', nullable: true, type: () => FindMgDto }) findOptions: FindMgDto
  ) {
    return await this.mgsProvider.getMgs(findOptions)
  }

  @UseGuards(GraphAuthGuard)
  @Query(() => MG)
  async getMg (
  @Args({ name: 'mgId', type: () => Int }) mgId: number
  ) {
    return await this.mgsProvider.getMg(mgId)
  }

  @UseGuards(GraphAuthGuard)
  @Mutation(() => Boolean)
  async createMg (
  @Args({ name: 'mgData', type: () => CreateMgDto }) mgData: CreateMgDto
  ) {
    return await this.mgsProvider.createMg(mgData)
  }

  @UseGuards(GraphAuthGuard)
  @Mutation(() => Boolean)
  async updateMg (
  @Args({ name: 'mgId', type: () => Int }) mgId: number,
    @Args({ name: 'mgData', type: () => UpdateMgDto }) mgData: UpdateMgDto
  ) {
    return await this.mgsProvider.updateMg(mgId, mgData)
  }

  @UseGuards(GraphAuthGuard)
  @Mutation(() => Boolean)
  async deleteMg (
  @Args({ name: 'mgId', type: () => Int }) mgId: number
  ) {
    return await this.mgsProvider.deleteMg(mgId)
  }
}
