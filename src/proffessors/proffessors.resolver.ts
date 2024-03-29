import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphAuthGuard } from 'src/users/graphAuthguard';
import { CreateProffessorDto } from './dtos/create_proffessor.dto';
import { FindProffessorDto } from './dtos/find_proffessor.dto';
import { UpdateProffessorDto } from './dtos/update_proffessor.dto';
import { Proffessor } from './proffessor.entity';
import { ProffessorsProvider } from './proffessors.service';

@Resolver(of => Proffessor)
export class ProffessorsResolver {
  constructor (
    private readonly proffessorsProvider: ProffessorsProvider
  ) { }

  @UseGuards(GraphAuthGuard)
  @Query(() => [Proffessor])
  async getProffessors (
  @Args({ name: 'findOptions', nullable: true, type: () => FindProffessorDto }) findOptions: FindProffessorDto
  ) {
    return await this.proffessorsProvider.getProffessors(findOptions)
  }

  @UseGuards(GraphAuthGuard)
  @Query(() => Proffessor)
  async getProffessor (
  @Args({ name: 'proffessorId', type: () => Int }) proffessorId: number
  ) {
    return await this.proffessorsProvider.getProffessor(proffessorId)
  }

  @UseGuards(GraphAuthGuard)
  @Mutation(() => Boolean)
  async createProffessor (
  @Args({ name: 'proffessorData', type: () => CreateProffessorDto }) proffessorData: CreateProffessorDto
  ) {
    return await this.proffessorsProvider.createProffessor(proffessorData)
  }

  @UseGuards(GraphAuthGuard)
  @Mutation(() => Boolean)
  async updateProffessor (
  @Args({ name: 'proffessorId', type: () => Int }) proffessorId: number,
    @Args({ name: 'proffessorData', type: () => UpdateProffessorDto }) proffessorData: UpdateProffessorDto
  ) {
    return await this.proffessorsProvider.updateProffessor(proffessorId, proffessorData)
  }

  @UseGuards(GraphAuthGuard)
  @Mutation(() => Boolean)
  async deleteProffessor (
  @Args({ name: 'proffessorId', type: () => Int }) proffessorId: number
  ) {
    return await this.proffessorsProvider.deleteProffessor(proffessorId)
  }
}
