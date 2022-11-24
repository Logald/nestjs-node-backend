import { Body, Controller, Post } from '@nestjs/common';
import { SpecialitiesProvider } from './specialities.service';
import { Speciality } from './speciality.entity';

@Controller('specialities')
export class SpecialitiesController {
  constructor(private specialitiesProvider: SpecialitiesProvider) {}

  @Post()
  createSpeciality(@Body() specialityData: Omit<Speciality, 'id'>) {
    return this.specialitiesProvider.createSpeciality(specialityData);
  }
}
