import { IsBoolean, IsInt, IsOptional, IsString, Min, MinLength } from 'class-validator'

export class CreateGroupDto {
  @IsInt()
  @Min(1)
    grade: number

  @IsString()
  @MinLength(1)
    name: string

  @IsOptional()
  @IsString()
    description: string

  @IsInt()
  @Min(1)
    turnId: number

  @IsOptional()
  @IsBoolean()
    active: boolean
}
