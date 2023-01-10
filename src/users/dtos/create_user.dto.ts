import { IsBoolean, IsInt, IsOptional, IsString, Min, MinLength } from 'class-validator'

export class CreateUserDto {
  @IsString()
  @MinLength(4)
    password: string

  @IsInt()
  @Min(1)
    personId: number

  @IsInt()
  @Min(1)
    profileId: number

  @IsOptional()
  @IsBoolean()
    active: boolean
}
