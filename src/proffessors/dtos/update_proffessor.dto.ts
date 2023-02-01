import { Field, InputType, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreateProffessorDto } from './create_proffessor.dto';

@InputType()
export class UpdateProffessorDto extends CreateProffessorDto {
  @IsOptional()
  @ApiProperty({ required: false })
  @Field(() => Int, { nullable: true })
  personId: number;
}
