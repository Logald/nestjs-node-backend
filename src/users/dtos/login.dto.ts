import { IsInt, IsString, Max, Min, MinLength } from 'class-validator'
export class LoginDto {
  @IsInt()
  @Min(10000000)
  @Max(99999999)
    ci: number

  @IsString()
  @MinLength(4)
    password: string
}
