import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';
import { FindTurnDto } from 'src/turns/dtos/find_turn.dto';
import { UpdateGroupDto } from './update_group.dto';

export class FindGroupDto extends UpdateGroupDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @ApiProperty({ required: false, minimum: 1 })
    id: number

  @IsOptional()
  @ApiProperty({ required: false })
  @Type(() => FindTurnDto)
    turn: FindTurnDto
}
