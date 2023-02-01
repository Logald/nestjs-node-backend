import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';
@InputType()
export class CreateTurnDto {
  @IsString()
  @MinLength(4)
  @ApiProperty({ minLength: 4 })
  @Field()
  name: string;
}
