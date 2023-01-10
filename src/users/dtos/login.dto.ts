import { ApiProperty } from '@nestjs/swagger'
import { IsInt, IsString, Max, Min, MinLength } from 'class-validator'
export class LoginDto {
  @IsInt()
  @Min(10000000)
  @Max(99999999)
  @ApiProperty()
    ci: number

  @IsString()
  @MinLength(4)
  @ApiProperty()
    password: string
}
