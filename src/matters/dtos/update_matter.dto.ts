import { ApiProperty } from '@nestjs/swagger'
import { IsOptional } from 'class-validator'
import { CreateMatterDto } from './create_matter.dto'

export class UpdateMatterDto extends CreateMatterDto {
  @IsOptional()
  @ApiProperty({ required: false })
    name: string
}
