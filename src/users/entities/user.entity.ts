import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

export enum statusEnum{
  Active = 'active',
  Inactive = 'inactive',
  Suspended = 'suspended'
}

@Schema({timestamps: true})
@ObjectType()
export class User {

  @Field(() => ID)
  _id: string;

  @Prop({ required: true, maxlength: 30})
  @Field(()=> String, {nullable: false})
  name: string;

  @Prop({ required: true, unique: true})
  @Field(()=> String, {nullable: false})
  email: string;

  @Prop({ required: true})
  @Field(()=> Number, {nullable: false})
  age: number;

  @Prop({ required: true, enum: statusEnum, default: statusEnum.Active})
  @Field(() => String, {nullable: false})
  status: string;
}

//Create document
export type UserDocument = User & Document;

//Create schema
export const UserSchema = SchemaFactory.createForClass(User);

