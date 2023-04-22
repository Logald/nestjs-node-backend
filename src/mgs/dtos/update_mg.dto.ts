import { Field, InputType, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreateMgDto } from './create_mg.dto';

@InputType()
export class UpdateMgDto extends CreateMgDto {
  @IsOptional()
  @ApiProperty({ required: false })
  @Field(() => Int, { nullable: true })
    matterId: number;

  @IsOptional()
  @ApiProperty({ required: false })
  @Field(() => Int, { nullable: true })
    groupId: number;
}
