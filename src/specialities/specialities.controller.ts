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

  @Get('/proffessor')
  getSpecialitiesWithProffessor() {
    return this.specialitiesProvider.getSpecialitiesWithProffessor();
  }

  @Get('/:id')
  getSpeciality(@Param('id') specialityId: number) {
    return this.specialitiesProvider.getSpeciality(specialityId);
  }

  @Post()
  createSpeciality(@Body() specialityData: Omit<Speciality, 'id'>) {
    return this.specialitiesProvider.createSpeciality(specialityData);
  }
}
