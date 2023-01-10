import { ApiProperty } from '@nestjs/swagger'
import { IsOptional } from 'class-validator'
import { CreateTurnDto } from './create_turn.dto'

export class UpdateTurnDto extends CreateTurnDto {
  @IsOptional()
  @ApiProperty({ required: false })
    name: string
}
