import { IsString, MinLength } from 'class-validator'

export class CreateProfileDto {
  @IsString()
  @MinLength(1)
    type: string
}
