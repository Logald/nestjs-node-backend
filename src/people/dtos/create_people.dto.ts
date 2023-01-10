import { IsInt, IsString, Max, Min, MinLength } from 'class-validator'

export class CreatePeopleDto {
  @IsString()
  @MinLength(1)
    name: string

  @IsString()
  @MinLength(1)
    lastname: string

  @IsInt()
  @Min(10000000)
  @Max(99999999)
    ci: number
}
