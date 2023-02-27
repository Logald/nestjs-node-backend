import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean, IsOptional,
  IsString, MinLength
} from 'class-validator';

@InputType()
export class CreateUserDto {
  @IsString()
  @MinLength(4)
  @ApiProperty({ minLength: 4 })
  @Field()
  name: string;

  @IsString()
  @MinLength(4)
  @ApiProperty({ minLength: 4 })
  @Field()
  password: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ required: false, default: true })
  @Field({ nullable: true })
  active: boolean;
}
