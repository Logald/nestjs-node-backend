import { ApiProperty } from '@nestjs/swagger'
import { IsOptional } from 'class-validator'
import { CreateGroupDto } from './create_group.dto'

export class UpdateGroupDto extends CreateGroupDto {
  @IsOptional()
  @ApiProperty({ required: false })
    grade: number

  @IsOptional()
  @ApiProperty({ required: false })
    name: string

  @IsOptional()
  @ApiProperty({ required: false })
    turnId: number
}
