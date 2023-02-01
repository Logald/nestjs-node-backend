import { Field, InputType, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Max, Min, MinLength } from 'class-validator';
@InputType()
export class CreatePeopleDto {
  @IsString()
  @MinLength(1)
  @ApiProperty({ minLength: 1 })
  @Field()
  name: string;

  @IsString()
  @MinLength(1)
  @ApiProperty({ minLength: 1 })
  @Field()
  lastname: string;

  @IsInt()
  @Min(10000000)
  @Max(99999999)
  @ApiProperty({ minimum: 10000000, maximum: 99999999 })
  @Field(() => Int)
  ci: number;
}
