import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}
  async create(createUserInput: CreateUserInput): Promise<User> {
    const user = new User()
    user.username = createUserInput.username
    user.email = createUserInput.email
    user.password = createUserInput.password

    return await user.save();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async findRegex(regex: any): Promise<User[]> {
    return await this.userModel.findAll()
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
