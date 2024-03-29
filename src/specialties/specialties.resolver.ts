import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { MattersProvider } from 'src/matters/matters.service';
import { ProffessorsProvider } from 'src/proffessors/proffessors.service';
import { GraphAuthGuard } from 'src/users/graphAuthguard';
import { CreateSpecialtyDto } from './dtos/create_specialty.dto';
import { FindSpecialtyDto } from './dtos/find_specialty.dto';
import { UpdateSpecialtyDto } from './dtos/update_specialty.dto';
import { SpecialtiesProvider } from './specialties.service';
import { Specialty } from './specialty.entity';

@Resolver(of => Specialty)
export class SpecialtiesResolver {
  constructor (
    private readonly proffessorsProvider: ProffessorsProvider,
    private readonly mattersProvider: MattersProvider,
    private readonly specialtiesProvider: SpecialtiesProvider
  ) { }

  @ResolveField()
  async proffessor (@Parent() specialty: Specialty) {
    return await this.proffessorsProvider.getProffessor(specialty.proffessorId)
  }

  @ResolveField()
  async matter (@Parent() specialty: Specialty) {
    return await this.mattersProvider.getMatter(specialty.matterId)
  }

  @UseGuards(GraphAuthGuard)
  @Query(() => [Specialty])
  async getSpecialties (
  @Args({ name: 'findOptions', nullable: true, type: () => FindSpecialtyDto }) findOptions: FindSpecialtyDto
  ) {
    return await this.specialtiesProvider.getSpecialties(findOptions)
  }

  @UseGuards(GraphAuthGuard)
  @Query(() => Specialty)
  async getSpecialty (
  @Args({ name: 'specialtyId', type: () => Int }) specialtyId: number
  ) {
    return await this.specialtiesProvider.getSpecialty(specialtyId)
  }

  @UseGuards(GraphAuthGuard)
  @Mutation(() => Boolean)
  async createSpecialty (
  @Args({ name: 'specialtyData', type: () => CreateSpecialtyDto }) specialtyData: CreateSpecialtyDto
  ) {
    return await this.specialtiesProvider.createSpecialty(specialtyData)
  }

  @UseGuards(GraphAuthGuard)
  @Mutation(() => Boolean)
  async updateSpecialty (
  @Args({ name: 'specialtyId', type: () => Int }) specialtyId: number,
    @Args({ name: 'specialtyData', type: () => UpdateSpecialtyDto }) specialtyData: UpdateSpecialtyDto
  ) {
    return await this.specialtiesProvider.updateSpecialty(specialtyId, specialtyData)
  }

  @UseGuards(GraphAuthGuard)
  @Mutation(() => Boolean)
  async deleteSpecialty (
  @Args({ name: 'specialtyId', type: () => Int }) specialtyId: number
  ) {
    return await this.specialtiesProvider.deletespecialty(specialtyId)
  }
}
