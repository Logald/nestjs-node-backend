import { IsInt, IsOptional, Min } from 'class-validator';
import { UpdateProfileDto } from './update_profile.dto';

export class FindProfileDto extends UpdateProfileDto {
  @IsOptional()
  @IsInt()
  @Min(1)
    id: number
}
