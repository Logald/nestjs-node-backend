import { Field, InputType, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';
import { FindMgDto } from 'src/mgs/dtos/find_mg.dto';
import { FindProffessorDto } from 'src/proffessors/dtos/find_proffessor.dto';
import { UpdateGmpDto } from './update_gmp.dto';

@InputType()
export class FindGmpDto extends UpdateGmpDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @ApiProperty({ required: false, minimum: 1 })
  @Field(() => Int, { nullable: true })
    id: number;

  @IsOptional()
  @ApiProperty({ required: false })
  @Type(() => FindMgDto)
  @Field(() => FindMgDto, { nullable: true })
    mg: FindMgDto;

  @IsOptional()
  @ApiProperty({ required: false })
  @Type(() => FindProffessorDto)
  @Field(() => FindProffessorDto, { nullable: true })
    proffessor: FindProffessorDto;
}
