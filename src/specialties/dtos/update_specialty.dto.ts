import { Field, InputType, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreateSpecialtyDto } from './create_specialty.dto';

@InputType()
export class UpdateSpecialtyDto extends CreateSpecialtyDto {
  @IsOptional()
  @ApiProperty({ required: false })
  @Field(() => Int, { nullable: true })
  proffessorId: number;

  @IsOptional()
  @ApiProperty({ required: false })
  @Field(() => Int, { nullable: true })
  matterId: number;
}
