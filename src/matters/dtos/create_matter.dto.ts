import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString, MinLength } from 'class-validator'

export class CreateMatterDto {
  @IsString()
  @MinLength(1)
  @ApiProperty({ minLength: 1 })
    name: string

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
    description: string
}
