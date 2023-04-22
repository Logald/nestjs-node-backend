import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreateUserDto } from './create_user.dto';

@InputType()
export class UpdateUserDto extends CreateUserDto {
  @IsOptional()
  @ApiProperty({ required: false })
  @Field({ nullable: true })
    name: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @Field({ nullable: true })
    password: string;
}
