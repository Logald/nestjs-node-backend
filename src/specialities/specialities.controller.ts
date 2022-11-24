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

  @Get('/proffessor')
  getSpecialitiesWithProffessor() {
    return this.specialitiesProvider.getSpecialitiesWithProffessor();
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
