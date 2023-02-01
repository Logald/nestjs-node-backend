import { Field, InputType, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';
import { FindPeopleDto } from 'src/people/dtos/find_people.dto';
import { UpdateProffessorDto } from './update_proffessor.dto';

@InputType()
export class FindProffessorDto extends UpdateProffessorDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @ApiProperty({ required: false, minimum: 1 })
  @Field(() => Int, { nullable: true })
  id: number;

  @IsOptional()
  @Type(() => FindPeopleDto)
  @ApiProperty({ required: false })
  @Field(() => FindPeopleDto, { nullable: true })
  person: FindPeopleDto;
}
