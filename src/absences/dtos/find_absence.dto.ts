import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';
import { FindTurnDto } from 'src/turns/dtos/find_turn.dto';
import { UpdateAbsenceDto } from './update_absence.dto';

export class FindAbsenceDto extends UpdateAbsenceDto {
  @IsOptional()
  @IsInt()
  @Min(1)
    id: number

  @IsOptional()
  @Type(() => FindTurnDto)
    turn: FindTurnDto
}
