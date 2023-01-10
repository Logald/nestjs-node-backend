import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';
import { FindMgDto } from 'src/mgs/dtos/find_mg.dto';
import { FindProffessorDto } from 'src/proffessors/dtos/find_proffessor.dto';
import { UpdateGmpDto } from './update_gmp.dto';

export class FindGmpDto extends UpdateGmpDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @ApiProperty({ required: false, minimum: 1 })
    id: number

  @IsOptional()
  @ApiProperty({ required: false })
  @Type(() => FindMgDto)
    mg: FindMgDto

  @IsOptional()
  @ApiProperty({ required: false })
  @Type(() => FindProffessorDto)
    proffessor: FindProffessorDto
}
