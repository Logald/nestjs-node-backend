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
import { Gmp } from './gmp.entity'
import { GmpsProvider } from './gmps.service'
import { CreateGmp } from './schemas/create_gmp.schema'
import { UpdateGmp } from './schemas/update_gmp.schema'

@UseGuards(AccessTokenGuard)
@Controller('gmps')
export class GmpsController {
  constructor (private readonly gmpsProvider: GmpsProvider) {}

  @Post()
  async getGmpsByJson (@Body() gmpsFindManyOptions: Gmp) {
    return await this.gmpsProvider.getGmps(gmpsFindManyOptions)
  }

  @Post('/all')
  async getGmpsWithRelationsByJson (@Body() gmpsFindManyOptions: Gmp) {
    return await this.gmpsProvider.getGmpsWithRelations(gmpsFindManyOptions)
  }

  @Post('/create')
  async createGmp (@Body() gmpData: z.infer<typeof CreateGmp>) {
    return await this.gmpsProvider.createGmp(gmpData)
  }

  @Get('/:id')
  async getGmp (@Param('id') gmpId: number) {
    return await this.gmpsProvider.getGmp(gmpId)
  }

  @Get('/:id/all')
  async getGmpWithRelations (@Param('id') gmpId: number) {
    return await this.gmpsProvider.getGmpWithRelations(gmpId)
  }

  @Patch('/:gmpId')
  async updateGmp (
  @Param('gmpId') gmpId: number,
    @Body() gmpData: z.infer<typeof UpdateGmp>
  ) {
    return await this.gmpsProvider.updateGmp(gmpId, gmpData)
  }

  @Delete('/:gmpId')
  async deleteGmp (@Param('gmpId') gmpId: number) {
    return await this.gmpsProvider.deleteGmp(gmpId)
  }
}
