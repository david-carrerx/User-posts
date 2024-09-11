import { CreatePostInput } from './create-post.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { Length, IsEmail, IsIn, Min, Max, isNotEmpty, Contains } from 'class-validator';

@InputType()
export class UpdatePostInput extends PartialType(CreatePostInput) {
  @Field({nullable: true})
  @Length(1,50)
  title?: string;

  @Field({nullable: true})
  @Length(1,300)
  description?: string;

  @Field({ nullable: true })
  @IsIn(['active', 'inactive', 'reported'], { message: 'Status is not valid' })
  status?: string

  @Field({ nullable: true })
  userId?: string;
}
