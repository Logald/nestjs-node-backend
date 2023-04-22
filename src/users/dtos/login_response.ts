import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginResponseDto {
  @Field()
    token: string;
}
