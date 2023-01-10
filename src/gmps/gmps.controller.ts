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
import { CreateGmpDto } from './dtos/create_gmp.dto'
import { FindGmpDto } from './dtos/find_gmp.dto'
import { UpdateGmpDto } from './dtos/update_gmp.dto'
import { GmpsProvider } from './gmps.service'

@UseGuards(AccessTokenGuard)
@ApiTags('gmps')
@Controller('gmps')
export class GmpsController {
  constructor (private readonly gmpsProvider: GmpsProvider) {}

  @Post()
  async getGmpsByJson (@Body() gmpsFindManyOptions: FindGmpDto) {
    return await this.gmpsProvider.getGmps(gmpsFindManyOptions)
  }

  @Post('/all')
  async getGmpsWithRelationsByJson (@Body() gmpsFindManyOptions: FindGmpDto) {
    return await this.gmpsProvider.getGmpsWithRelations(gmpsFindManyOptions)
  }

  @Post('/create')
  async createGmp (@Body() gmpData: CreateGmpDto) {
    return await this.gmpsProvider.createGmp(gmpData)
  }

  @Get('/:id')
  async getGmp (@Param('id', ParseIntPipe) gmpId: number) {
    return await this.gmpsProvider.getGmp(gmpId)
  }

  @Get('/:id/all')
  async getGmpWithRelations (@Param('id', ParseIntPipe) gmpId: number) {
    return await this.gmpsProvider.getGmpWithRelations(gmpId)
  }

  @Patch('/:gmpId')
  async updateGmp (
  @Param('gmpId') gmpId: number,
    @Body() gmpData: UpdateGmpDto
  ) {
    return await this.gmpsProvider.updateGmp(gmpId, gmpData)
  }

  @Delete('/:gmpId')
  async deleteGmp (@Param('gmpId') gmpId: number) {
    return await this.gmpsProvider.deleteGmp(gmpId)
  }
}
