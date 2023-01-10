import { ApiProperty } from '@nestjs/swagger'
import { IsString, MinLength } from 'class-validator'

export class CreateProfileDto {
  @IsString()
  @MinLength(1)
  @ApiProperty({ minLength: 1 })
    type: string
}
