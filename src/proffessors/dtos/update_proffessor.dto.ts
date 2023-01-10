import { IsOptional } from 'class-validator';
import { CreateProffessorDto } from './create_proffessor.dto';

export class UpdateProffessorDto extends CreateProffessorDto {
  @IsOptional()
    personId: number
}
