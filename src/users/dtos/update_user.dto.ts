import { ApiProperty } from '@nestjs/swagger'
import { IsOptional } from 'class-validator'
import { CreateUserDto } from './create_user.dto'

export class UpdateUserDto extends CreateUserDto {
  @IsOptional()
  @ApiProperty({ required: false })
    personId: number

  @IsOptional()
  @ApiProperty({ required: false })
    password: string

  @IsOptional()
  @ApiProperty({ required: false })
    profileId: number
}
