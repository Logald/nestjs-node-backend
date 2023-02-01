import { Field, InputType, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateUserDto {
  @IsString()
  @MinLength(4)
  @ApiProperty({ minLength: 4 })
  @Field()
  password: string;

  @IsInt()
  @Min(1)
  @ApiProperty({ minimum: 1 })
  @Field(() => Int)
  personId: number;

  @IsInt()
  @Min(1)
  @ApiProperty({ minimum: 1 })
  @Field(() => Int)
  profileId: number;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ required: false, default: true })
  @Field({ nullable: true })
  active: boolean;
}
