import { IsBoolean, IsInt, IsOptional, Min } from 'class-validator';

export class CreateProffessorDto {
  @IsInt()
  @Min(1)
    personId: number;

  @IsBoolean()
  @IsOptional()
    active: boolean;
}
