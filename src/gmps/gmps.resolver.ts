import { UseGuards } from "@nestjs/common";
import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { MGProvider } from "src/mgs/mgs.service";
import { ProffessorsProvider } from "src/proffessors/proffessors.service";
import { GraphAuthGuard } from "src/users/graphAuthguard";
import { CreateGmpDto } from "./dtos/create_gmp.dto";
import { FindGmpDto } from "./dtos/find_gmp.dto";
import { UpdateGmpDto } from "./dtos/update_gmp.dto";
import { Gmp } from './gmp.entity';
import { GmpsProvider } from "./gmps.service";

@Resolver(of => Gmp)
export class GmpsResolver {
  constructor(
    private mgsProvider: MGProvider,
    private proffessorsProvider: ProffessorsProvider,
    private gmpsProvider: GmpsProvider
  ) { }

  @ResolveField()
  async mg(@Parent() gmp: Gmp) {
    return await this.mgsProvider.getMg(gmp.mgId)
  }

  @ResolveField()
  async proffessor(@Parent() gmp: Gmp) {
    return await this.proffessorsProvider.getProffessor(gmp.proffessorId)
  }

  @UseGuards(GraphAuthGuard)
  @Query(() => [Gmp])
  async getGmps(
    @Args({ name: 'findOptions', nullable: true, type: () => FindGmpDto }) findOptions: FindGmpDto
  ) {
    return await this.gmpsProvider.getGmps(findOptions)
  }

  @UseGuards(GraphAuthGuard)
  @Query(() => Gmp)
  async getGmp(
    @Args({ name: 'gmpId', type: () => Int }) gmpId: number
  ) {
    return await this.gmpsProvider.getGmp(gmpId)
  }

  @UseGuards(GraphAuthGuard)
  @Mutation(() => Boolean)
  async createGmp(
    @Args({ name: 'gmpData', type: () => CreateGmpDto }) gmpData: CreateGmpDto
  ) {
    return await this.gmpsProvider.createGmp(gmpData)
  }

  @UseGuards(GraphAuthGuard)
  @Mutation(() => Boolean)
  async updateGmp(
    @Args({ name: 'gmpId', type: () => Int }) gmpId: number,
    @Args({ name: 'gmpData', type: () => UpdateGmpDto }) gmpData: UpdateGmpDto
  ) {
    return await this.gmpsProvider.updateGmp(gmpId, gmpData)
  }

  @UseGuards(GraphAuthGuard)
  @Mutation(() => Boolean)
  async deleteGmp(
    @Args({ name: 'gmpId', type: () => Int }) gmpId: number
  ) {
    return await this.gmpsProvider.deleteGmp(gmpId)
  }
}