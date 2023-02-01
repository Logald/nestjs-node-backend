import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

@InputType()
export class CreateProfileDto {
  @IsString()
  @MinLength(1)
  @ApiProperty({ minLength: 1 })
  @Field()
  type: string;
}
