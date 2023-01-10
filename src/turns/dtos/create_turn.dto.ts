import { ApiProperty } from '@nestjs/swagger'
import { IsString, MinLength } from 'class-validator'

export class CreateTurnDto {
  @IsString()
  @MinLength(4)
  @ApiProperty({ minLength: 4 })
    name: string
}
