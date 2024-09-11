import { InputType, Int, Field } from '@nestjs/graphql';
import { Length, IsIn, IsNotEmpty } from 'class-validator';

@InputType()
export class CreatePostInput {
  @Field()
  @Length(1, 50)
  title: string;

  @Field()
  @Length(1,300)
  description: string;

  @Field(() => String, { nullable: true, defaultValue: 'active' })
  @IsIn(['active', 'inactive', 'reported'], { message: 'Status is not valid' })
  status?: string

  @Field()
  @IsNotEmpty({ message: "User ID is required" })
  userId: string;
}
