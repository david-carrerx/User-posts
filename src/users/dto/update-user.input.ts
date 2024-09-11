import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { Length, IsEmail, IsIn, Min, Max, isNotEmpty, Contains } from 'class-validator';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field({nullable: true})
  @Length(1, 30)
  name?: string;

  @Field({nullable: true})
  @IsEmail({}, {message: "The email must be a valid email adress"})
  email?: string;

  @Field({ nullable: true })
  @Min(1)
  age?: number;

  @Field({ nullable: true })
  @IsIn(['active', 'inactive', 'suspended'], { message: 'Status is not valid' })
  status?: string;
}
