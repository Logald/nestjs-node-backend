import { Field, InputType, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreateAbsenceDto } from './create_absence.dto';

@InputType()
export class UpdateAbsenceDto extends CreateAbsenceDto {
  @IsOptional()
  @ApiProperty({ required: false })
  @Field(() => Int, { nullable: true })
    gmpId: number;

  @IsOptional()
  @ApiProperty({ required: false })
  @Field(() => Int, { nullable: true })
    turnId: number;

  @IsOptional()
  @ApiProperty({ required: false })
  @Field(() => String, { nullable: true })
    startDate: Date;

  @IsOptional()
  @ApiProperty({ required: false })
  @Field(() => String, { nullable: true })
    endDate: Date;
}
