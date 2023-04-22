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
import { Response } from 'express';
import { AccessTokenGuard } from 'src/users/accessTokenGuard';
import { CreateGmpDto } from './dtos/create_gmp.dto';
import { FindGmpDto } from './dtos/find_gmp.dto';
import { UpdateGmpDto } from './dtos/update_gmp.dto';
import { GmpsProvider } from './gmps.service';

@UseGuards(AccessTokenGuard)
@ApiBearerAuth()
@ApiTags('api/gmps')
@Controller('api/gmps')
export class GmpsController {
  constructor (private readonly gmpsProvider: GmpsProvider) { }

  @Post()
  async getGmpsByJson (@Body() gmpsFindManyOptions: FindGmpDto) {
    return await this.gmpsProvider.getGmps(gmpsFindManyOptions);
  }

  @Post('/all')
  async getGmpsWithRelationsByJson (@Body() gmpsFindManyOptions: FindGmpDto) {
    return await this.gmpsProvider.getGmpsWithRelations(gmpsFindManyOptions);
  }

  @Post('/create')
  async createGmp (@Body() gmpData: CreateGmpDto, @Res() res: Response) {
    return res.json(await this.gmpsProvider.createGmp(gmpData));
  }

  @Get('/:id')
  async getGmp (@Param('id', ParseIntPipe) gmpId: number) {
    return await this.gmpsProvider.getGmp(gmpId);
  }

  @Get('/:id/all')
  async getGmpWithRelations (@Param('id', ParseIntPipe) gmpId: number) {
    return await this.gmpsProvider.getGmpWithRelations(gmpId);
  }

  @Put('/:gmpId')
  async updateGmp (
  @Param('gmpId') gmpId: number,
    @Body() gmpData: UpdateGmpDto,
    @Res() res: Response
  ) {
    return res.json(await this.gmpsProvider.updateGmp(gmpId, gmpData));
  }

  @Delete('/:gmpId')
  async deleteGmp (@Param('gmpId') gmpId: number, @Res() res: Response) {
    return res.json(await this.gmpsProvider.deleteGmp(gmpId));
  }
}
