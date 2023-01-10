import { IsInt, IsOptional, Min } from 'class-validator';
import { UpdateTurnDto } from './update_turn.dto';

export class FindTurnDto extends UpdateTurnDto {
  @IsOptional()
  @IsInt()
  @Min(1)
    id: number
}
