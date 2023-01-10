import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';
import { FindPeopleDto } from 'src/people/dtos/find_people.dto';
import { FindProfileDto } from 'src/profiles/dtos/find_profile.dto';
import { UpdateUserDto } from './update_user.dto';

export class FindUserDto extends UpdateUserDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @ApiProperty({ required: false, minimum: 1 })
    id: number

  @IsOptional()
  @Type(() => FindPeopleDto)
  @ApiProperty({ required: false })
    person: FindPeopleDto

  @IsOptional()
  @Type(() => FindProfileDto)
  @ApiProperty({ required: false })
    profile: FindProfileDto
}
