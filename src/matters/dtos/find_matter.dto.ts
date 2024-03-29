import { Field, InputType, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, Min } from 'class-validator';
import { UpdateMatterDto } from './update_matter.dto';

@InputType()
export class FindMatterDto extends UpdateMatterDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @ApiProperty({ required: false, minimum: 1 })
  @Field(() => Int, { nullable: true })
    id: number;
}
