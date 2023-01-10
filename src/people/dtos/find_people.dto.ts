import { IsInt, IsOptional, Min } from 'class-validator';
import { UpdatePeopleDto } from './update_people.dto';

export class FindPeopleDto extends UpdatePeopleDto {
  @IsOptional()
  @IsInt()
  @Min(1)
    id: number
}
