import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { USERS_DB } from './user.database';
import { v4 } from 'uuid';

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    const newUser = {
      id: v4(),
      ...createUserDto,
      version: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    USERS_DB.push(newUser);
    return newUser;
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
