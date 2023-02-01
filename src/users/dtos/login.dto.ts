import { Field, InputType, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Max, Min, MinLength } from 'class-validator';

@InputType()
export class LoginDto {
  @IsInt()
  @Min(10000000)
  @Max(99999999)
  @ApiProperty()
  @Field((type) => Int)
  ci: number;

  @IsString()
  @MinLength(4)
  @ApiProperty()
  @Field()
  password: string;
}
