import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { error } from 'console';

@Injectable()
export class UsersService {
constructor(@InjectModel('User') private readonly userModel: Model<User>){}

  async create(createUserInput: CreateUserInput): Promise<User> {
    const existingUser = await this.userModel.findOne({ email: createUserInput.email });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }
    const newUser = new this.userModel(createUserInput);
    return newUser.save();
  }

  async findAll() {
    return this.userModel.find().exec();
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id).exec();
    if(!user){
      throw new NotFoundException(`Item with ID "${id}" not found`);
    }
    return user;
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    const existingUser = await this.userModel.findByIdAndUpdate(id, updateUserInput, { new: true }).exec();
    if (!existingUser) {
      throw new NotFoundException(`User with Id "${id}" not found`);
    }
    return existingUser;
  }

  async remove(id: string) {
    const user = await this.userModel.findByIdAndDelete(id).exec();
    if(!user){
      throw new NotFoundException(`User with ID "${id}" not found`)
    }
    return user;
  }
}
