import { Field, InputType, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';
import { FindTurnDto } from 'src/turns/dtos/find_turn.dto';
import { UpdateGroupDto } from './update_group.dto';

@InputType()
export class FindGroupDto extends UpdateGroupDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @ApiProperty({ required: false, minimum: 1 })
  @Field(() => Int, { nullable: true })
    id: number;

  @IsOptional()
  @ApiProperty({ required: false })
  @Type(() => FindTurnDto)
  @Field(() => FindTurnDto, { nullable: true })
    turn: FindTurnDto;
}
