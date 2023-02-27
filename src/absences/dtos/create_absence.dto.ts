import { Field, InputType, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean, IsDateString, IsInt, IsOptional,
  IsString,
  Min
} from 'class-validator';

@InputType()
export class CreateAbsenceDto {
  @IsInt()
  @Min(1)
  @ApiProperty({ minimum: 1 })
  @Field(() => Int)
  gmpId: number;

  @IsInt()
  @Min(1)
  @ApiProperty({ minimum: 1 })
  @Field(() => Int)
  turnId: number;

  @IsDateString({ strictSeparator: true })
  @ApiProperty()
  @Field(() => String)
  startDate: Date;

  @IsDateString({ strictSeparator: true })
  @ApiProperty()
  @Field(() => String)
  endDate: Date;

  @IsOptional()
  @IsString()
  @ApiProperty()
  @Field({ nullable: true })
  reason: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ required: false })
  @Field({ nullable: true })
  active: boolean;
}
