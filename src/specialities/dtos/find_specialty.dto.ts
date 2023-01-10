import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';
import { FindMatterDto } from 'src/matters/dtos/find_matter.dto';
import { FindProffessorDto } from 'src/proffessors/dtos/find_proffessor.dto';
import { UpdateSpecialtyDto } from './update_specialty.dto';

export class FindSpecialtyDto extends UpdateSpecialtyDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @ApiProperty({ required: false, minimum: 1 })
    id: number

  @IsOptional()
  @Type(() => FindMatterDto)
  @ApiProperty({ required: false })
    matter: FindMatterDto

  @IsOptional()
  @Type(() => FindProffessorDto)
  @ApiProperty({ required: false })
    proffessor: FindProffessorDto
}
