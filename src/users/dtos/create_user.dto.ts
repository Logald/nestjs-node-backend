import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean, IsEnum, IsOptional,
  IsString, MinLength
} from 'class-validator';

export const userType = ['Director', 'Administrativo', 'Adscrito']

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

  @IsString()
  @MinLength(4)
  @ApiProperty({ minLength: 4 })
  @Field()
    firstname: string;

  @IsString()
  @MinLength(4)
  @ApiProperty({ minLength: 4 })
  @Field()
    lastname: string;

  @IsOptional()
  @IsEnum(userType)
  @ApiProperty({ required: false, default: 'Adscrito', enum: userType })
  @Field({ nullable: true, defaultValue: 'Adscrito' })
    type: 'Director' | 'Administrativo' | 'Adscrito'

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ required: false, default: true })
  @Field({ nullable: true })
    active: boolean;
}
