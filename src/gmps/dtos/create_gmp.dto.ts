import { IsBoolean, IsInt, IsOptional, Min } from 'class-validator'

export class CreateGmpDto {
  @IsInt()
  @Min(1)
    mgId: number

  @IsInt()
  @Min(1)
    proffessorId: number

  @IsOptional()
  @IsBoolean()
    active: boolean
}
