import { ApiProperty } from '@nestjs/swagger'
import { IsOptional } from 'class-validator'
import { CreatePeopleDto } from './create_people.dto'

export class UpdatePeopleDto extends CreatePeopleDto {
  @IsOptional()
  @ApiProperty({ required: false })
    name: string

  @IsOptional()
  @ApiProperty({ required: false })
    lastname: string

  @IsOptional()
  @ApiProperty({ required: false })
    ci: number
}
