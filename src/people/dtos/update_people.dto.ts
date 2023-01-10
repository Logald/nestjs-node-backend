import { IsOptional } from 'class-validator'
import { CreatePeopleDto } from './create_people.dto'

export class UpdatePeopleDto extends CreatePeopleDto {
  @IsOptional()
    name: string

  @IsOptional()
    lastname: string

  @IsOptional()
    ci: number
}
