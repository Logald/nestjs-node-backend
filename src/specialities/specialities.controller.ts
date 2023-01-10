import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { AccessTokenGuard } from 'src/users/accessTokenGuard'
import { CreateSpecialtyDto } from './dtos/create_specialty.dto'
import { FindSpecialtyDto } from './dtos/find_specialty.dto'
import { UpdateSpecialtyDto } from './dtos/update_specialty.dto'
import { SpecialitiesProvider } from './specialities.service'

@UseGuards(AccessTokenGuard)
@ApiTags('specialities')
@Controller('specialities')
export class SpecialitiesController {
  constructor (private readonly specialitiesProvider: SpecialitiesProvider) {}

  @Post()
  async getSpecialities (@Body() findManyOptions: FindSpecialtyDto) {
    return await this.specialitiesProvider.getSpecialities(findManyOptions)
  }

  @Post('/all')
  async getSpecialitiesWithRelations (@Body() findManyOptions: FindSpecialtyDto) {
    return await this.specialitiesProvider.getSpecialitiesWithRelations(
      findManyOptions
    )
  }

  @Post('/create')
  async createspecialty (@Body() specialtyData: CreateSpecialtyDto) {
    return await this.specialitiesProvider.createSpecialty(specialtyData)
  }

  @Get('/:id')
  async getSpecialty (@Param('id', ParseIntPipe) specialtyId: number) {
    return await this.specialitiesProvider.getSpecialty(specialtyId)
  }

  @Get('/:id/all')
  async getSpecialtyWithRelations (@Param('id', ParseIntPipe) specialtyId: number) {
    return await this.specialitiesProvider.getSpecialtyWithRelations(specialtyId)
  }

  @Patch('/:id')
  async updatespecialty (
  @Param('id', ParseIntPipe) specialtyId,
    @Body() specialtyData: UpdateSpecialtyDto
  ) {
    return await this.specialitiesProvider.updateSpecialty(
      specialtyId,
      specialtyData
    )
  }

  @Delete('/:id')
  async deletespecialty (@Param('id', ParseIntPipe) specialtyId: number) {
    return await this.specialitiesProvider.deletespecialty(specialtyId)
  }
}
