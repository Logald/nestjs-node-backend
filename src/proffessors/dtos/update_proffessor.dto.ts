import { Field, InputType, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreateProffessorDto } from './create_proffessor.dto';

@InputType()
export class UpdateProffessorDto extends CreateProffessorDto {
  @IsOptional()
  @ApiProperty({ minLength: 1 })
  @Field({ nullable: true })
    name: string;

  @IsOptional()
  @ApiProperty({ minLength: 1, required: false })
  @Field({ nullable: true })
    lastname: string;

  @IsOptional()
  @ApiProperty({ minimum: 10000000, maximum: 99999999, required: false })
  @Field(() => Int, { nullable: true })
    ci: number;
}
