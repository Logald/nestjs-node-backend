import { Field, InputType, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';
import { FindTurnDto } from 'src/turns/dtos/find_turn.dto';
import { UpdateAbsenceDto } from './update_absence.dto';

@InputType()
export class FindAbsenceDto extends UpdateAbsenceDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @ApiProperty({ required: false, minimum: 1 })
  @Field(() => Int, { nullable: true })
    id: number;

  @IsOptional()
  @Type(() => FindTurnDto)
  @ApiProperty({ required: false })
  @Field(() => FindTurnDto, { nullable: true })
    turn: FindTurnDto;
}
