import { Field, InputType, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, Min } from 'class-validator';
import { UpdateUserDto } from './update_user.dto';

@InputType()
export class FindUserDto extends UpdateUserDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @ApiProperty({ required: false, minimum: 1 })
  @Field((type) => Int, { nullable: true })
    id: number;
}
