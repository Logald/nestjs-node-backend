import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';
import { FindGroupDto } from 'src/groups/dtos/find_group.dto';
import { FindMatterDto } from 'src/matters/dtos/find_matter.dto';
import { UpdateMgDto } from './update_mg.dto';

export class FindMgDto extends UpdateMgDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @ApiProperty({ required: false, minimum: 1 })
    id: number

  @IsOptional()
  @ApiProperty({ required: false })
  @Type(() => FindMatterDto)
    matter: FindMatterDto

  @IsOptional()
  @ApiProperty({ required: false })
  @Type(() => FindGroupDto)
    group: FindGroupDto
}
