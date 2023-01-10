import { IsOptional } from 'class-validator'
import { CreateSpecialtyDto } from './create_specialty.dto'

export class UpdateSpecialtyDto extends CreateSpecialtyDto {
  @IsOptional()
    proffessorId: number

  @IsOptional()
    matterId: number
}
