import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsOptional, Min } from 'class-validator';

export class CreateProffessorDto {
  @IsInt()
  @Min(1)
  @ApiProperty({ minimum: 1 })
    personId: number;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false, default: true })
    active: boolean;
}
