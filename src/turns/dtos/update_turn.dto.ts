import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreateTurnDto } from './create_turn.dto';
@InputType()
export class UpdateTurnDto extends CreateTurnDto {
  @IsOptional()
  @ApiProperty({ required: false })
  @Field({ nullable: true })
    name: string;
}
