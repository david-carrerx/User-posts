import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput):Promise<User> {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [User], { name: 'users' })
  async users(): Promise<User[]>{
    return this.usersService.findAll();
  }
  
  @Query(() => User, { name: 'user' })
  async user(@Args('id') id: string):Promise<User>{
    return this.usersService.findOne(id);

  }

  @Mutation(() => User)
  async updateUser(@Args('id') id: string, @Args('updateUserInput') updateUserInput: UpdateUserInput):Promise<User> {
    return this.usersService.update(id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id') id: string): Promise<User>{
    return this.usersService.remove(id);
  }
}
