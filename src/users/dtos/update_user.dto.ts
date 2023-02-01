import { Field, InputType, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreateUserDto } from './create_user.dto';

@InputType()
export class UpdateUserDto extends CreateUserDto {
  @IsOptional()
  @ApiProperty({ required: false })
  @Field(() => Int, { nullable: true })
  personId: number;

  @IsOptional()
  @ApiProperty({ required: false })
  @Field({ nullable: true })
  password: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @Field(() => Int, { nullable: true })
  profileId: number;
}
