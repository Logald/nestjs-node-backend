import { IsOptional } from 'class-validator'
import { CreateGmpDto } from './create_gmp.dto'

export class UpdateGmpDto extends CreateGmpDto {
  @IsOptional()
    mgId: number

  @IsOptional()
    proffessorId: number
}
