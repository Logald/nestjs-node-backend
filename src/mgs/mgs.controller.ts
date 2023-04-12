import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/users/accessTokenGuard';
import { CreateMgDto } from './dtos/create_mg.dto';
import { FindMgDto } from './dtos/find_mg.dto';
import { UpdateMgDto } from './dtos/update_mg.dto';
import { MGProvider } from './mgs.service';

@UseGuards(AccessTokenGuard)
@ApiBearerAuth()
@ApiTags('api/mgs')
@Controller('api/mgs')
export class MGController {
  constructor(private readonly mgProvider: MGProvider) { }

  @Post()
  async getMgs(@Body() mgsFindManyOptions: FindMgDto) {
    return await this.mgProvider.getMgs(mgsFindManyOptions);
  }

  @Post('/all')
  async getMgsWithRelations(@Body() mgsFindManyOptions: FindMgDto) {
    return await this.mgProvider.getMgsWithRelations(mgsFindManyOptions);
  }

  @Post('/create')
  async createMg(@Body() mgData: CreateMgDto) {
    return await this.mgProvider.createMg(mgData);
  }

  @Get('/:id')
  async getMg(@Param('id', ParseIntPipe) mgId: number) {
    return await this.mgProvider.getMg(mgId);
  }

  @Get('/:id/all')
  async getMgWithRelations(@Param('id', ParseIntPipe) mgId: number) {
    return await this.mgProvider.getMgWithRelations(mgId);
  }

  @Put('/:id')
  async updateMg(
    @Param('id', ParseIntPipe) mgId: number,
    @Body() mgData: UpdateMgDto,
  ) {
    return await this.mgProvider.updateMg(mgId, mgData);
  }

  @Delete('/:id')
  async deleteMg(@Param('id', ParseIntPipe) mgId: number) {
    return await this.mgProvider.deleteMg(mgId);
  }
}
