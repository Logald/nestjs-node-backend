import { Field, InputType, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Min,
  MinLength
} from 'class-validator';

@InputType()
export class CreateGroupDto {
  @IsInt()
  @Min(1)
  @ApiProperty({ minimum: 1 })
  @Field(() => Int)
    grade: number;

  @IsString()
  @MinLength(1)
  @ApiProperty({ minimum: 1 })
  @Field()
    name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  @Field({ nullable: true })
    description: string;

  @IsInt()
  @Min(1)
  @ApiProperty({ minimum: 1 })
  @Field(() => Int)
    turnId: number;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ required: false })
  @Field({ nullable: true })
    active: boolean;
}
