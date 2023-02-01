import { Field, InputType, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';
import { FindPeopleDto } from 'src/people/dtos/find_people.dto';
import { FindProfileDto } from 'src/profiles/dtos/find_profile.dto';
import { UpdateUserDto } from './update_user.dto';

@InputType()
export class FindUserDto extends UpdateUserDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @ApiProperty({ required: false, minimum: 1 })
  @Field((type) => Int, { nullable: true })
  id: number;

  @IsOptional()
  @Type(() => FindPeopleDto)
  @ApiProperty({ required: false })
  @Field(() => FindPeopleDto, { nullable: true })
  person: FindPeopleDto;

  @IsOptional()
  @Type(() => FindProfileDto)
  @ApiProperty({ required: false })
  @Field(() => FindProfileDto, { nullable: true })
  profile: FindProfileDto;
}
