import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';

@Resolver(() => Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Query(() => [Post], { name: 'posts' })
  async posts():Promise<Post[]>{
    return this.postsService.findAll();
  }

  @Query(() => Post, { name: 'post' })
  async post(@Args('id') id: string): Promise<Post>{
    return this.postsService.findOne(id);
  }

  @Mutation(() => Post)
  async createPost(@Args('createPostInput') CreatePostInput: CreatePostInput): Promise<Post>{
    return this.postsService.create(CreatePostInput);
  }

  @Mutation(() => Post)
  async updatePost(@Args('id') id: string, @Args('updatePostInput') updatePostInput: UpdatePostInput): Promise<Post> {
    return this.postsService.update(id, updatePostInput);
  }

  @Mutation(() => Post)
  async removePost(@Args('id') id : string): Promise<Post> {
    return this.postsService.remove(id);
  }
}
