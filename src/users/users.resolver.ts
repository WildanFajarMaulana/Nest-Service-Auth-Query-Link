import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { GraphQLJSONObject } from 'graphql-type-json';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  // @Mutation(() => User, { name: 'createUser'})
  // async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
  //   console.log(createUserInput)
  //   return this.usersService.create(createUserInput);
  // }

  @Mutation(() => User, { name: 'createUser' })
  async createUser(@Args('input') input: CreateUserInput) {
    console.log(input);
    return this.usersService.create(input);
  }

  @Query(() => [User], { name: 'getUsers' })
  async findAll() {
    return this.usersService.findAll();
  }

  @Query(() => [User], { name: 'getUserFilter' })
  async findRegex(@Args('regex') regex: CreateUserInput) {
    console.log({ regex });
    return this.usersService.findRegex(regex);
  }

  @Query(() => [User])
  async allFilter(
    @Args('args', { type: () => GraphQLJSONObject }) args: any,
  ) {
    console.log({ ...args})
    console.log({ args: args.like })
    // Menggunakan args sesuai kebutuhan
    // Contoh: melakukan query berdasarkan argumen tertentu
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.remove(id);
  }
}
