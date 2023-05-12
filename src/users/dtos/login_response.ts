import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../user.entity';

@ObjectType()
export class LoginResponseDto {
  @Field()
    token: string;

  @Field()
    user: User;
}
