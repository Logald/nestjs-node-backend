import { IsOptional, IsString, MinLength } from 'class-validator'

export class CreateMatterDto {
  @IsString()
  @MinLength(1)
    name: string

  @IsOptional()
  @IsString()
    description: string
}
