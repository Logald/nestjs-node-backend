import { IsBoolean, IsDateString, IsInt, IsOptional, Min } from 'class-validator'

export class CreateAbsenceDto {
  @IsInt()
  @Min(1)
    gmpId: number

  @IsInt()
  @Min(1)
    turnId: number

  @IsDateString({ strictSeparator: true })
    startDate: Date

  @IsDateString({ strictSeparator: true })
    endDate: Date

  @IsOptional()
  @IsBoolean()
    active: boolean
}
