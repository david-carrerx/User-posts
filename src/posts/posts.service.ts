import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {

  constructor(@InjectModel('Post') private readonly postModel: Model<Post>) {}

  async create(createPostInput: CreatePostInput): Promise<Post> {
    const newPost = new this.postModel(createPostInput);
    return newPost.save();
  }

  async findAll() {
    return this.postModel.find().exec();
  }

  async findOne(id: string) {
    const post = await this.postModel.findById(id).exec();
    if(!post){
      throw new NotFoundException(`Post with ID "${id}" not found`);
    }
    return post;
  }

  async update(id: string, updatePostInput: UpdatePostInput) {
    const allowedStatuses = ['active', 'inactive', 'suspended'];

    if (updatePostInput.status !== undefined) {
      if (!allowedStatuses.includes(updatePostInput.status)) {
        throw new BadRequestException('Invalid status value');
      }
      if (updatePostInput.status === '') {
        throw new BadRequestException('Status must not be empty');
      }
    }

    if (updatePostInput.title !== undefined && updatePostInput.title === '') {
      throw new BadRequestException('Title must not be empty');
    }

    if (updatePostInput.description !== undefined && updatePostInput.description === '') {
      throw new BadRequestException('Description must not be empty');
    }

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
    return post;//
  }
}
