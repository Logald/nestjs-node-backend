import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateMatterDto {
  @IsString()
  @MinLength(1)
  @ApiProperty({ minLength: 1 })
  @Field()
    name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  @Field({ nullable: true })
    description: string;
}
