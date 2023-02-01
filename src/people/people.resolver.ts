import { UseGuards } from "@nestjs/common";
import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GraphAuthGuard } from "src/users/graphAuthguard";
import { CreatePeopleDto } from "./dtos/create_people.dto";
import { FindPeopleDto } from "./dtos/find_people.dto";
import { UpdatePeopleDto } from "./dtos/update_people.dto";
import { PeopleProvider } from "./people.service";
import { Person } from "./person.entity";

@Resolver()
export class PeopleResolver {
  constructor(private peopleProvider: PeopleProvider) { }

  @Query(() => [Person])
  async getPeople(
    @Args({ name: 'findOptions', nullable: true, type: () => FindPeopleDto }) findOptions?: FindPeopleDto
  ) {
    return await this.peopleProvider.getPeople(findOptions)
  }

  @Query(() => Person)
  async getPerson(
    @Args({ name: 'personId', type: () => Int }) personId: number
  ) {
    return await this.peopleProvider.getPerson(personId)
  }

  @Mutation(() => Boolean)
  async createPerson(
    @Args({ name: 'personData', type: () => CreatePeopleDto }) personData: CreatePeopleDto
  ) {
    await this.peopleProvider.createPerson(personData)
    return true
  }

  @UseGuards(GraphAuthGuard)
  @Mutation(() => Boolean)
  async updatePerson(
    @Args({ name: 'personId', type: () => Int }) personId: number,
    @Args({ name: 'personData', type: () => UpdatePeopleDto }) personData: UpdatePeopleDto
  ) {
    await this.peopleProvider.updatePerson(personId, personData)
    return true
  }

  @UseGuards(GraphAuthGuard)
  @Mutation(() => Boolean)
  async deletePerson(
    @Args({ name: 'personId', type: () => Int }) personId: number
  ) {
    await this.peopleProvider.deletePerson(personId)
    return true
  }
}