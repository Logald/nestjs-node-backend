import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsDateString, IsInt, IsOptional, Min } from 'class-validator'

export class CreateAbsenceDto {
  @IsInt()
  @Min(1)
  @ApiProperty({ minimum: 1 })
    gmpId: number

  @IsInt()
  @Min(1)
  @ApiProperty({ minimum: 1 })
    turnId: number

  @IsDateString({ strictSeparator: true })
  @ApiProperty()
    startDate: Date

  @IsDateString({ strictSeparator: true })
  @ApiProperty()
    endDate: Date

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ required: false })
    active: boolean
}
