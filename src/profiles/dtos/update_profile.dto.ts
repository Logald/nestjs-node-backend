import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreateProfileDto } from './create_profile.dto';

@InputType()
export class UpdateProfileDto extends CreateProfileDto {
  @IsOptional()
  @ApiProperty({ required: false })
  @Field({ nullable: true })
  type: string;
}
