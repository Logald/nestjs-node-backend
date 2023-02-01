import { Field, InputType, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreatePeopleDto } from './create_people.dto';

@InputType()
export class UpdatePeopleDto extends CreatePeopleDto {
  @IsOptional()
  @ApiProperty({ required: false })
  @Field({ nullable: true })
  name: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @Field({ nullable: true })
  lastname: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @Field(() => Int, { nullable: true })
  ci: number;
}
