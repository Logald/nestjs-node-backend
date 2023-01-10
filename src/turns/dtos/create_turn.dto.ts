import { IsString, MinLength } from 'class-validator'

export class CreateTurnDto {
  @IsString()
  @MinLength(4)
    name: string
}
