import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

@InputType()
export class LoginDto {
  @IsString()
  @MinLength(4)
  @ApiProperty()
  @Field()
  name: string;

  @IsString()
  @MinLength(4)
  @ApiProperty()
  @Field()
  password: string;
}
