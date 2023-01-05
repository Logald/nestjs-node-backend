import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards
} from '@nestjs/common'
import { AccessTokenGuard } from 'src/users/accessTokenGuard'
import { z } from 'zod'
import { CreateSpecialty } from './schemas/create_specialty.schema'
import { UpdateSpecialty } from './schemas/update_specialty.schema'
import { SpecialitiesProvider } from './specialities.service'
import { Specialty } from './specialty.entity'

@UseGuards(AccessTokenGuard)
@Controller('specialities')
export class SpecialitiesController {
  constructor (private readonly specialitiesProvider: SpecialitiesProvider) {}

  @Post()
  async getSpecialities (@Body() findManyOptions: Specialty) {
    return await this.specialitiesProvider.getSpecialities(findManyOptions)
  }

  @Post('/all')
  async getSpecialitiesWithRelations (@Body() findManyOptions: Specialty) {
    return await this.specialitiesProvider.getSpecialitiesWithRelations(
      findManyOptions
    )
  }

  @Post('/create')
  async createspecialty (@Body() specialtyData: z.infer<typeof CreateSpecialty>) {
    return await this.specialitiesProvider.createSpecialty(specialtyData)
  }

  @Get('/:id')
  async getSpecialty (@Param('id') specialtyId: number) {
    return await this.specialitiesProvider.getSpecialty(specialtyId)
  }

  @Get('/:id/all')
  async getSpecialtyWithRelations (@Param('id') specialtyId: number) {
    return await this.specialitiesProvider.getSpecialtyWithRelations(specialtyId)
  }

  @Patch('/:id')
  async updatespecialty (
  @Param('id') specialtyId,
    @Body() specialtyData: z.infer<typeof UpdateSpecialty>
  ) {
    return await this.specialitiesProvider.updateSpecialty(
      specialtyId,
      specialtyData
    )
  }

  @Delete('/:id')
  async deletespecialty (@Param('id') specialtyId: number) {
    return await this.specialitiesProvider.deletespecialty(specialtyId)
  }
}
