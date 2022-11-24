import { Body, Controller, Get, Post } from '@nestjs/common';
import { SpecialitiesProvider } from './specialities.service';
import { Speciality } from './speciality.entity';

@Controller('specialities')
export class SpecialitiesController {
  constructor(private specialitiesProvider: SpecialitiesProvider) {}

  @Get()
  getSpecialities() {
    return this.specialitiesProvider.getSpecialities();
  }

  @Post()
  createSpeciality(@Body() specialityData: Omit<Speciality, 'id'>) {
    return this.specialitiesProvider.createSpeciality(specialityData);
  }
}
