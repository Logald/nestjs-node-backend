import { Field, InputType, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreateGroupDto } from './create_group.dto';

@InputType()
export class UpdateGroupDto extends CreateGroupDto {
  @IsOptional()
  @ApiProperty({ required: false })
  @Field(() => Int, { nullable: true })
  grade: number;

  @IsOptional()
  @ApiProperty({ required: false })
  @Field({ nullable: true })
  name: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @Field(() => Int, { nullable: true })
  turnId: number;
}
