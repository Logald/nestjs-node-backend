import { ApiProperty } from '@nestjs/swagger'
import { IsOptional } from 'class-validator'
import { CreateSpecialtyDto } from './create_specialty.dto'

export class UpdateSpecialtyDto extends CreateSpecialtyDto {
  @IsOptional()
  @ApiProperty({ required: false })
    proffessorId: number

  @IsOptional()
  @ApiProperty({ required: false })
    matterId: number
}
