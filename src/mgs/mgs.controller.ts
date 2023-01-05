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
import { MG } from './mg.entity'
import { MGProvider } from './mgs.service'
import { CreateMg } from './schemas/create_mg.schema'
import { UpdateMg } from './schemas/update_mg.schema'

@UseGuards(AccessTokenGuard)
@Controller('mgs')
export class MGController {
  constructor (private readonly mgProvider: MGProvider) {}

  @Post()
  async getMgs (@Body() mgsFindManyOptions: MG) {
    return await this.mgProvider.getMgs(mgsFindManyOptions)
  }

  @Post('/all')
  async getMgsWithRelations (@Body() mgsFindManyOptions: MG) {
    return await this.mgProvider.getMgsWithRelations(mgsFindManyOptions)
  }

  @Post('/create')
  async createMg (@Body() mgData: z.infer<typeof CreateMg>) {
    return await this.mgProvider.createMg(mgData)
  }

  @Get('/:mgId')
  async getMg (@Param('mgId') mgId: number) {
    return await this.mgProvider.getMg(mgId)
  }

  @Get('/:mgId/all')
  async getMgWithRelations (@Param('mgId') mgId: number) {
    return await this.mgProvider.getMgWithRelations(mgId)
  }

  @Patch('/:mgId')
  async updateMg (
  @Param('mgId') mgId: number,
    @Body() mgData: z.infer<typeof UpdateMg>
  ) {
    return await this.mgProvider.updateMg(mgId, mgData)
  }

  @Delete('/:mgId')
  async deleteMg (@Param('mgId') mgId: number) {
    return await this.mgProvider.deleteMg(mgId)
  }
}
