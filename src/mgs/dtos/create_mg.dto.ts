import { Field, InputType, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

@InputType()
export class CreateMgDto {
  @IsInt()
  @Min(1)
  @ApiProperty({ minimum: 1 })
  @Field(() => Int)
  matterId: number;

  @IsInt()
  @Min(1)
  @ApiProperty({ minimum: 1 })
  @Field(() => Int)
  groupId: number;
}
