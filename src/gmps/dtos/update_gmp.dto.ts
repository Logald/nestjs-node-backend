import { Field, InputType, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreateGmpDto } from './create_gmp.dto';

@InputType()
export class UpdateGmpDto extends CreateGmpDto {
  @IsOptional()
  @ApiProperty({ required: false })
  @Field(() => Int, { nullable: true })
    mgId: number;

  @IsOptional()
  @ApiProperty({ required: false })
  @Field(() => Int, { nullable: true })
    proffessorId: number;
}
