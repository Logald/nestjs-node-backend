import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsInt, IsOptional, Min } from 'class-validator'

export class CreateGmpDto {
  @IsInt()
  @Min(1)
  @ApiProperty({ minimum: 1 })
    mgId: number

  @IsInt()
  @Min(1)
  @ApiProperty({ minimum: 1 })
    proffessorId: number

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ required: false })
    active: boolean
}
