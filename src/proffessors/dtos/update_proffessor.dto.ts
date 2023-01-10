import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreateProffessorDto } from './create_proffessor.dto';

export class UpdateProffessorDto extends CreateProffessorDto {
  @IsOptional()
  @ApiProperty({ required: false })
    personId: number
}
