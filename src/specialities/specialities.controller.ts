import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SpecialitiesProvider } from './specialities.service';
import { Speciality } from './speciality.entity';

@Controller('specialities')
export class SpecialitiesController {
  constructor(private specialitiesProvider: SpecialitiesProvider) {}

  @Get()
  getSpecialities() {
    return this.specialitiesProvider.getSpecialities();
  }

  @Get('/matter')
  getSpecialitiesWithMatter() {
    return this.specialitiesProvider.getSpecialitiesWithMatter();
  }

  @Get('/matter/proffessor')
  getSpecialitiesWithMatterAndProffessor() {
    return this.specialitiesProvider.getSpecialitiesWithMatterAndProffessor();
  }

  @Get('/matter/:matterId/proffessor')
  getSpecialitiesWithMatterIdAndProffesor(@Param('matterId') matterId: number) {
    return this.specialitiesProvider.getSpecialitiesWithMatterIdAndProffessor(
      matterId,
    );
  }

  @Get('/matter/:matterId/proffessor/active')
  getSpecialitiesWithMatterIdAndActiveProffesor(
    @Param('matterId') matterId: number,
  ) {
    return this.specialitiesProvider.getSpecialitiesWithMatterIdAndActiveProffessor(
      matterId,
    );
  }

  @Get('/matter/:matterId/proffessor/inactive')
  getSpecialitiesWithMatterIdAndInactiveProffesor(
    @Param('matterId') matterId: number,
  ) {
    return this.specialitiesProvider.getSpecialitiesWithMatterIdAndInactiveProffessor(
      matterId,
    );
  }

  @Get('/matter/:matterId')
  getSpecialitiesWithMatterId(@Param('matterId') matterId: number) {
    return this.specialitiesProvider.getSpecialitiesWithMatterId(matterId);
  }

  @Get('/proffessor')
  getSpecialitiesWithProffessor() {
    return this.specialitiesProvider.getSpecialitiesWithProffessor();
  }

  @Get('/proffessor/active')
  getSpecialitiesWithActiveProffessors() {
    return this.specialitiesProvider.getSpecialitiesWithActiveProffessors();
  }

  @Get('/proffessor/inactive')
  getSpecialitiesWithInactiveProffessors() {
    return this.specialitiesProvider.getSpecialitiesWithInactiveProffessors();
  }

  @Get('/proffessor/:id')
  getSpecialitiesWithProffessorId(@Param('id') proffessorId: number) {
    return this.specialitiesProvider.getSpecialitiesWithProffessorId(
      proffessorId,
    );
  }

  @Get('/:id')
  getSpeciality(@Param('id') specialityId: number) {
    return this.specialitiesProvider.getSpeciality(specialityId);
  }

  @Get('/:id/matter')
  getSpecialityWithMatter(@Param('id') specialityId: number) {
    return this.specialitiesProvider.getSpecialityWithMatter(specialityId);
  }

  @Get('/:id/proffessor')
  getSpecialityWithProffessor(@Param('id') specialityId: number) {
    return this.specialitiesProvider.getSpecialityWithProffessor(specialityId);
  }

  @Get('/matter/:matterId/proffessor/:proffessorId')
  getSpecialityWithMatterIdAndProffessorId(
    @Param('matterId') matterId: number,
    @Param('proffessorId') proffessorId: number,
  ) {
    return this.specialitiesProvider.getSpecialityWithMatterIdAndProffessorId(
      matterId,
      proffessorId,
    );
  }

  @Post()
  createSpeciality(@Body() specialityData: Omit<Speciality, 'id'>) {
    return this.specialitiesProvider.createSpeciality(specialityData);
  }
}
