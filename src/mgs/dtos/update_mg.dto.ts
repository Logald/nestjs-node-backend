import { ApiProperty } from '@nestjs/swagger'
import { IsOptional } from 'class-validator'
import { CreateMgDto } from './create_mg.dto'

export class UpdateMgDto extends CreateMgDto {
  @IsOptional()
  @ApiProperty({ required: false })
    matterId: number

  @IsOptional()
  @ApiProperty({ required: false })
    groupId: number
}
