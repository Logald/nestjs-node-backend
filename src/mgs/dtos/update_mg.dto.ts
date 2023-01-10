import { IsOptional } from 'class-validator'
import { CreateMgDto } from './create_mg.dto'

export class UpdateMgDto extends CreateMgDto {
  @IsOptional()
    matterId: number

  @IsOptional()
    groupId: number
}
