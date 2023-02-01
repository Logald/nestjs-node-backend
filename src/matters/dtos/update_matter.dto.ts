import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreateMatterDto } from './create_matter.dto';

@InputType()
export class UpdateMatterDto extends CreateMatterDto {
  @IsOptional()
  @ApiProperty({ required: false })
  @Field({ nullable: true })
  name: string;
}
