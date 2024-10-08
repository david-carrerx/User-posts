import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
//import { DateScalar } from "src/common/scalars/date.scalars";
//import { ProductSpecification } from "./product.specification";
import mongoose from 'mongoose';
import { User } from 'src/users/entities/user.entity';

export enum statusEnum{
  Active = 'active',
  Inactive = 'inactive',
  Reported = 'reported'
}

@Schema({timestamps:true})
@ObjectType()
export class Post {

  @Field(() => ID)
  _id: string;

  @Prop({ required: true, maxlength: 50})
  @Field(()=> String, {nullable: false})
  title: string;

  @Prop({ required: true, maxlength: 300})
  @Field(() => String, {nullable: false})
  description: string;

  @Prop({ required: true, enum: statusEnum, default: statusEnum.Active})
  @Field(() => String, {nullable: false})
  status: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true})
  @Field(() => User, {nullable: false})
  userId: User;

  
}

//Create document
export type PostDocument = Post & Document;

//Create schema
export const PostSchema = SchemaFactory.createForClass(Post);
