import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';
import { FindMgDto } from 'src/mgs/dtos/find_mg.dto';
import { FindProffessorDto } from 'src/proffessors/dtos/find_proffessor.dto';
import { UpdateGmpDto } from './update_gmp.dto';

export class FindGmpDto extends UpdateGmpDto {
  @IsOptional()
  @IsInt()
  @Min(1)
    id: number

  @IsOptional()
  @Type(() => FindMgDto)
    mg: FindMgDto

  @IsOptional()
  @Type(() => FindProffessorDto)
    proffessor: FindProffessorDto
}
