import { IsOptional } from 'class-validator'
import { CreateUserDto } from './create_user.dto'

export class UpdateUserDto extends CreateUserDto {
  @IsOptional()
    personId: number

  @IsOptional()
    password: string

  @IsOptional()
    profileId: number

  @IsOptional()
    active: boolean
}
