import { IsInt, Min } from 'class-validator'

export class CreateMgDto {
  @IsInt()
  @Min(1)
    matterId: number

  @IsInt()
  @Min(1)
    groupId: number
}
