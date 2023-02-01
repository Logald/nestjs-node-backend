import { Field, InputType, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';
import { FindGroupDto } from 'src/groups/dtos/find_group.dto';
import { FindMatterDto } from 'src/matters/dtos/find_matter.dto';
import { UpdateMgDto } from './update_mg.dto';

@InputType()
export class FindMgDto extends UpdateMgDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @ApiProperty({ required: false, minimum: 1 })
  @Field(() => Int, { nullable: true })
  id: number;

  @IsOptional()
  @ApiProperty({ required: false })
  @Type(() => FindMatterDto)
  @Field(() => FindMatterDto, { nullable: true })
  matter: FindMatterDto;

  @IsOptional()
  @ApiProperty({ required: false })
  @Type(() => FindGroupDto)
  @Field(() => FindGroupDto, { nullable: true })
  group: FindGroupDto;
}
