import { UseGuards } from "@nestjs/common";
import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { GmpsProvider } from "src/gmps/gmps.service";
import { TurnsProvider } from "src/turns/turns.service";
import { GraphAuthGuard } from "src/users/graphAuthguard";
import { Absence } from './abcense.entity';
import { AbsencesProvider } from "./absences.service";
import { CreateAbsenceDto } from "./dtos/create_absence.dto";
import { FindAbsenceDto } from "./dtos/find_absence.dto";
import { UpdateAbsenceDto } from "./dtos/update_absence.dto";

@Resolver(of => Absence)
export class AbsencesResolver {
  constructor(
    private gmpsProvider: GmpsProvider,
    private turnsProvider: TurnsProvider,
    private absencesProvider: AbsencesProvider
  ) { }

  @ResolveField()
  async gmp(@Parent() absence: Absence) {
    return await this.gmpsProvider.getGmp(absence.gmpId)
  }

  @ResolveField()
  async turn(@Parent() absence: Absence) {
    return await this.turnsProvider.getTurn(absence.turnId)
  }

  @UseGuards(GraphAuthGuard)
  @Query(() => [Absence])
  async getAbsences(
    @Args({ name: 'findOptions', nullable: true, type: () => FindAbsenceDto }) findOptions: FindAbsenceDto
  ) {
    return await this.absencesProvider.getAbsences(findOptions)
  }

  @UseGuards(GraphAuthGuard)
  @Query(() => Absence)
  async getAbsence(
    @Args({ name: 'absenceId', type: () => Int }) absenceId: number
  ) {
    return await this.absencesProvider.getAbsence(absenceId)
  }

  @UseGuards(GraphAuthGuard)
  @Mutation(() => Boolean)
  async createAbsence(
    @Args({ name: 'absenceData', type: () => CreateAbsenceDto }) absenceData: CreateAbsenceDto
  ) {
    await this.absencesProvider.createAbsence(absenceData)
    return true
  }

  @UseGuards(GraphAuthGuard)
  @Mutation(() => Boolean)
  async updateAbsence(
    @Args({ name: 'absenceId', type: () => Int }) absenceId: number,
    @Args({ name: 'absenceData', type: () => UpdateAbsenceDto }) absenceData: UpdateAbsenceDto
  ) {
    await this.absencesProvider.updateAbsense(absenceId, absenceData)
    return true
  }

  @UseGuards(GraphAuthGuard)
  @Mutation(() => Boolean)
  async deleteAbsence(
    @Args({ name: 'absenceId', type: () => Int }) absenceId: number
  ) {
    await this.absencesProvider.deleteAbsence(absenceId)
    return true
  }
}