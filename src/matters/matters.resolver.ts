import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateMatterDto } from './dtos/create_matter.dto';
import { FindMatterDto } from './dtos/find_matter.dto';
import { UpdateMatterDto } from './dtos/update_matter.dto';
import { Matter } from './matter.entity';
import { MattersProvider } from './matters.service';

@Resolver()
export class MattersResolver {
  constructor (
    private readonly mattersProvider: MattersProvider
  ) { }

  @Query(() => [Matter])
  async getMatters (
  @Args({ name: 'findOptions', nullable: true, type: () => FindMatterDto }) findOptions: FindMatterDto
  ) {
    return await this.mattersProvider.getMatters(findOptions)
  }

  @Query(() => Matter)
  async getMatter (
  @Args({ name: 'matterId', type: () => Int }) matterId: number
  ) {
    return await this.mattersProvider.getMatter(matterId)
  }

  @Mutation(() => Boolean)
  async createMatter (
  @Args({ name: 'matterData', type: () => CreateMatterDto }) matterData: CreateMatterDto
  ) {
    return await this.mattersProvider.createMatter(matterData)
  }

  @Mutation(() => Boolean)
  async updateMatter (
  @Args({ name: 'matterId', type: () => Int }) matterId: number,
    @Args({ name: 'matterData', type: () => UpdateMatterDto }) matterData: UpdateMatterDto
  ) {
    return await this.mattersProvider.updateMatter(matterId, matterData)
  }

  @Mutation(() => Boolean)
  async deleteMatter (
  @Args({ name: 'matterId', type: () => Int }) matterId: number
  ) {
    return await this.mattersProvider.deleteMatter(matterId)
  }
}
