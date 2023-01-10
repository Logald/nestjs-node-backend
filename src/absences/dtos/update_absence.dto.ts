import { ApiProperty } from '@nestjs/swagger'
import { IsOptional } from 'class-validator'
import { CreateAbsenceDto } from './create_absence.dto'

export class UpdateAbsenceDto extends CreateAbsenceDto {
  @IsOptional()
  @ApiProperty({ required: false })
    gmpId: number

  @IsOptional()
  @ApiProperty({ required: false })
    turnId: number

  @IsOptional()
  @ApiProperty({ required: false })
    startDate: Date

  @IsOptional()
  @ApiProperty({ required: false })
    endDate: Date
}
