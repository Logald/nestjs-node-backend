import { Field, InputType, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';
import { FindMatterDto } from 'src/matters/dtos/find_matter.dto';
import { FindProffessorDto } from 'src/proffessors/dtos/find_proffessor.dto';
import { UpdateSpecialtyDto } from './update_specialty.dto';

@InputType()
export class FindSpecialtyDto extends UpdateSpecialtyDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @ApiProperty({ required: false, minimum: 1 })
  @Field(() => Int, { nullable: true })
  id: number;

  @IsOptional()
  @Type(() => FindMatterDto)
  @ApiProperty({ required: false })
  @Field(() => FindMatterDto, { nullable: true })
  matter: FindMatterDto;

  @IsOptional()
  @Type(() => FindProffessorDto)
  @ApiProperty({ required: false })
  @Field(() => FindProffessorDto, { nullable: true })
  proffessor: FindProffessorDto;
}
