import { IsOptional } from 'class-validator'
import { CreateAbsenceDto } from './create_absence.dto'

export class UpdateAbsenceDto extends CreateAbsenceDto {
  @IsOptional()
    gmpId: number

  @IsOptional()
    turnId: number

  @IsOptional()
    startDate: Date

  @IsOptional()
    endDate: Date
}
