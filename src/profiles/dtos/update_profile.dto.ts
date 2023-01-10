import { ApiProperty } from '@nestjs/swagger'
import { IsOptional } from 'class-validator'
import { CreateProfileDto } from './create_profile.dto'

export class UpdateProfileDto extends CreateProfileDto {
  @IsOptional()
  @ApiProperty({ required: false })
    type: string
}
