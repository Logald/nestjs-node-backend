import { IsOptional } from 'class-validator'
import { CreateTurnDto } from './create_turn.dto'

export class UpdateTurnDto extends CreateTurnDto {
  @IsOptional()
    name: string
}
