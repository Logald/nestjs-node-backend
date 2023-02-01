import { Field, InputType, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsOptional, Min } from 'class-validator';

@InputType()
export class CreateProffessorDto {
  @IsInt()
  @Min(1)
  @ApiProperty({ minimum: 1 })
  @Field(() => Int)
  personId: number;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false, default: true })
  @Field({ nullable: true })
  active: boolean;
}
