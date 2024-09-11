import { InputType, Int, Field } from '@nestjs/graphql';
import { Length, IsIn } from 'class-validator';

@InputType()
export class CreatePostInput {

  @Field()
  @Length(1, 50)
  title: string;

  @Field()
  @Length(1,300)
  description: string;

  @Field(() => String, { nullable: true })
  @IsIn(['active', 'inactive', 'reported'], { message: 'Status is not valid' })
  status?: string
}
