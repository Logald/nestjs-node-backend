import { IsOptional } from 'class-validator'
import { CreateProfileDto } from './create_profile.dto'

export class UpdateProfileDto extends CreateProfileDto {
  @IsOptional()
    type: string
}
