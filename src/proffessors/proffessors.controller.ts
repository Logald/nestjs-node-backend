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
import { CreateProffessorDto } from './dtos/create_proffessor.dto';
import { FindProffessorDto } from './dtos/find_proffessor.dto';
import { UpdateProffessorDto } from './dtos/update_proffessor.dto';
import { ProffessorsProvider } from './proffessors.service';
@UseGuards(AccessTokenGuard)
@ApiBearerAuth()
@ApiTags('api/proffessors')
@Controller('api/proffessors')
export class ProffessorsController {
  constructor (private readonly proffessorsProvider: ProffessorsProvider) { }

  @Post()
  async getProffessors (@Body() proffessorData: FindProffessorDto) {
    return await this.proffessorsProvider.getProffessors(proffessorData);
  }

  @Post('/create')
  async createProffessor (@Body() proffessorData: CreateProffessorDto, @Res() res: Response) {
    return res.json(await this.proffessorsProvider.createProffessor(proffessorData));
  }

  @Get('/:id')
  async getProffessor (@Param('id', ParseIntPipe) proffessorId: number) {
    return await this.proffessorsProvider.getProffessor(proffessorId);
  }

  @Put('/:id')
  async updateProffessor (
  @Param('id', ParseIntPipe) proffessorId: number,
    @Body() proffessorData: UpdateProffessorDto,
    @Res() res: Response
  ) {
    return res.json(await this.proffessorsProvider.updateProffessor(
      proffessorId,
      proffessorData
    ));
  }

  @Delete('/:id')
  async deleteProffessor (@Param('id', ParseIntPipe) proffessorId: number, @Res() res: Response) {
    return res.json(await this.proffessorsProvider.deleteProffessor(proffessorId));
  }
}
