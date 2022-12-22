import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
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
  createspecialty(@Body() specialtyData: z.infer<typeof CreateSpecialty>) {
    return this.specialitiesProvider.createSpecialty(specialtyData);
  }

  @Get('/:id')
  getSpecialty(@Param('id') specialtyId: number) {
    return this.specialitiesProvider.getSpecialty(specialtyId);
  }

  @Get('/:id/all')
  getSpecialtyWithRelations(@Param('id') specialtyId: number) {
    return this.specialitiesProvider.getSpecialtyWithRelations(specialtyId);
  }

  @Patch('/:id')
  updatespecialty(
    @Param('id') specialtyId,
    @Body() specialtyData: z.infer<typeof UpdateSpecialty>,
  ) {
    return this.specialitiesProvider.updateSpecialty(
      specialtyId,
      specialtyData,
    );
  }

  @Delete('/:id')
  deletespecialty(@Param('id') specialtyId: number) {
    return this.specialitiesProvider.deletespecialty(specialtyId);
  }
}
