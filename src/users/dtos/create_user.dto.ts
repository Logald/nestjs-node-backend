import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsInt, IsOptional, IsString, Min, MinLength } from 'class-validator'

export class CreateUserDto {
  @IsString()
  @MinLength(4)
  @ApiProperty({ minLength: 4 })
    password: string

  @IsInt()
  @Min(1)
  @ApiProperty({ minimum: 1 })
    personId: number

  @IsInt()
  @Min(1)
  @ApiProperty({ minimum: 1 })
    profileId: number

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ required: false, default: true })
    active: boolean
}
