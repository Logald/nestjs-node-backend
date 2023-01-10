import { IsOptional } from 'class-validator'
import { CreateGroupDto } from './create_group.dto'

export class UpdateGroupDto extends CreateGroupDto {
  @IsOptional()
    grade: number

  @IsOptional()
    name: string

  @IsOptional()
    turnId: number
}
