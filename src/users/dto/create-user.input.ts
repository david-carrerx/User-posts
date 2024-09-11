import { InputType, Int, Field } from '@nestjs/graphql';
import { Length, IsEmail, IsIn, Min, Max, isNotEmpty } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @Length(1, 30)
  name: string;

  @Field()
  @IsEmail({}, {message: "The email must be a valid email adress"})
  email: string;

  @Field()
  @Min(1)
  age: number;

  @Field(() => String, { nullable: true, defaultValue: 'active' })
  @IsIn(['active', 'inactive', 'suspended'], { message: 'Status is not valid' })
  status?: string

}
