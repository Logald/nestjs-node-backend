import { IsInt, IsOptional, Min } from 'class-validator';
import { UpdateMatterDto } from './update_matter.dto';

export class FindMatterDto extends UpdateMatterDto {
  @IsOptional()
  @IsInt()
  @Min(1)
    id: number
}
