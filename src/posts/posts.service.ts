import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './entities/post.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class PostsService {

  constructor(
    @InjectModel('Post') private readonly postModel: Model<Post>,
    @InjectModel('User') private readonly userModel: Model<User>
) {}

  async create(createPostInput: CreatePostInput): Promise<Post> {
    const {userId} = createPostInput;

    const userExists = await this.userModel.findById(userId).exec();
    if (!userExists) {
      throw new NotFoundException(`User with ID "${userId}" not found`);
    }

    const newPost = new this.postModel(createPostInput);
    return newPost.save();
  }

  async findAll() {
    return this.postModel.find().exec();
  }

  async findByUserId(userId: string):Promise<Post[]>{
    return this.postModel.find({userId}).exec();
  }

  async findOne(id: string) {
    const post = await this.postModel.findById(id).exec();
    if(!post){
      throw new NotFoundException(`Post with ID "${id}" not found`);
    }
    return post;
  }

  async update(id: string, updatePostInput: UpdatePostInput) {
    const existingPost = await this.postModel.findByIdAndUpdate(id, updatePostInput, { new: true }).exec();
    if (!existingPost) {
      throw new NotFoundException(`Post with Id "${id}" not found`);
    }
    return existingPost;
  }

  async remove(id: string) {
    const post = await this.postModel.findByIdAndDelete(id).exec();
    if(!post){
      throw new NotFoundException(`Post with Id "${id}" not found`)
    }
    return post;
  }
}
