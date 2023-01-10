import { ApiProperty } from '@nestjs/swagger'
import { IsOptional } from 'class-validator'
import { CreateGmpDto } from './create_gmp.dto'

export class UpdateGmpDto extends CreateGmpDto {
  @IsOptional()
  @ApiProperty({ required: false })
    mgId: number

  @IsOptional()
  @ApiProperty({ required: false })
    proffessorId: number
}
