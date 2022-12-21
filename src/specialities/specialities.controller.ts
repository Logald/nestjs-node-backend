import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { z } from 'zod';
import { CreateSpecialty } from './schemas/create_specialty.schema';
import { UpdateSpecialty } from './schemas/update_specialty.schema';
import { SpecialitiesProvider } from './specialities.service';
import { Specialty } from './specialty.entity';

@Controller('specialities')
export class SpecialitiesController {
  constructor(private specialitiesProvider: SpecialitiesProvider) {}

  @Post()
  getSpecialities(@Body() findManyOptions: Specialty) {
    return this.specialitiesProvider.getSpecialities(findManyOptions);
  }

  @Post('/all')
  getSpecialitiesWithRelations(@Body() findManyOptions: Specialty) {
    return this.specialitiesProvider.getSpecialitiesWithRelations(
      findManyOptions,
    );
  }

  @Post('/create')
  createSpeciality(@Body() specialityData: z.infer<typeof CreateSpecialty>) {
    return this.specialitiesProvider.createSpecialty(specialityData);
  }

  @Get('/:id')
  getSpecialty(@Param('id') specialityId: number) {
    return this.specialitiesProvider.getSpecialty(specialityId);
  }

  @Get('/:id/all')
  getSpecialtyWithRelations(@Param('id') specialityId: number) {
    return this.specialitiesProvider.getSpecialtyWithRelations(specialityId);
  }

  @Patch('/:id')
  updateSpeciality(
    @Param('id') specialityId,
    @Body() specialityData: z.infer<typeof UpdateSpecialty>,
  ) {
    return this.specialitiesProvider.updateSpecialty(
      specialityId,
      specialityData,
    );
  }

  @Delete('/:id')
  deleteSpeciality(@Param('id') specialityId: number) {
    return this.specialitiesProvider.deleteSpeciality(specialityId);
  }
}
