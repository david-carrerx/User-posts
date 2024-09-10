import { CreatePostInput } from './create-post.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePostInput extends PartialType(CreatePostInput) {
  @Field({nullable: true})
  title?: string;

  @Field({nullable: true})
  description?: string;

  @Field({ nullable: true })
  status?: string
}
