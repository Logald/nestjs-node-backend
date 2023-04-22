import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
  UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/users/accessTokenGuard';
import { CreateSpecialtyDto } from './dtos/create_specialty.dto';
import { FindSpecialtyDto } from './dtos/find_specialty.dto';
import { UpdateSpecialtyDto } from './dtos/update_specialty.dto';
import { SpecialtiesProvider } from './specialties.service';
import { Response } from 'express';

@UseGuards(AccessTokenGuard)
@ApiBearerAuth()
@ApiTags('api/specialties')
@Controller('api/specialties')
export class SpecialitiesController {
  constructor (private readonly specialitiesProvider: SpecialtiesProvider) { }

  @Post()
  async getSpecialties (@Body() findManyOptions: FindSpecialtyDto) {
    return await this.specialitiesProvider.getSpecialties(findManyOptions);
  }

  @Post('/all')
  async getSpecialtiesWithRelations (
  @Body() findManyOptions: FindSpecialtyDto
  ) {
    return await this.specialitiesProvider.getSpecialtiesWithRelations(
      findManyOptions
    );
  }

  @Post('/create')
  async createspecialty (@Body() specialtyData: CreateSpecialtyDto, @Res() res: Response) {
    return res.json(await this.specialitiesProvider.createSpecialty(specialtyData));
  }

  @Get('/:id')
  async getSpecialty (@Param('id', ParseIntPipe) specialtyId: number) {
    return await this.specialitiesProvider.getSpecialty(specialtyId);
  }

  @Get('/:id/all')
  async getSpecialtyWithRelations (
  @Param('id', ParseIntPipe) specialtyId: number
  ) {
    return await this.specialitiesProvider.getSpecialtyWithRelations(
      specialtyId
    );
  }

  @Put('/:id')
  async updatespecialty (
  @Param('id', ParseIntPipe) specialtyId,
    @Body() specialtyData: UpdateSpecialtyDto,
    @Res() res: Response
  ) {
    return res.json(await this.specialitiesProvider.updateSpecialty(
      specialtyId,
      specialtyData
    ));
  }

  @Delete('/:id')
  async deletespecialty (@Param('id', ParseIntPipe) specialtyId: number, @Res() res: Response) {
    return res.json(await this.specialitiesProvider.deletespecialty(specialtyId));
  }
}
