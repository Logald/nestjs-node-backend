import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';
import { FindPeopleDto } from 'src/people/dtos/find_people.dto';
import { UpdateProffessorDto } from './update_proffessor.dto';

export class FindProffessorDto extends UpdateProffessorDto {
  @IsOptional()
  @IsInt()
  @Min(1)
    id: number

  @IsOptional()
  @Type(() => FindPeopleDto)
    person: FindPeopleDto
}
