import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsInt, IsOptional, IsString, Min, MinLength } from 'class-validator'

export class CreateGroupDto {
  @IsInt()
  @Min(1)
  @ApiProperty({ minimum: 1 })
    grade: number

  @IsString()
  @MinLength(1)
  @ApiProperty({ minimum: 1 })
    name: string

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
    description: string

  @IsInt()
  @Min(1)
  @ApiProperty({ minimum: 1 })
    turnId: number

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ required: false })
    active: boolean
}
