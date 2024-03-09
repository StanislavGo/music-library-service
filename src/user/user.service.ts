import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { USERS_DB } from './user.database';
import { v4 } from 'uuid';
import { plainToClass } from 'class-transformer';
import { SerializedUser } from './serializedUser';

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    const newUser = {
      id: v4(),
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    };

    USERS_DB.push(newUser);
    return newUser;
  }

  findAll() {
    return USERS_DB.map((user) => plainToClass(SerializedUser, user));
  }

  findOne(id: string) {
    return USERS_DB.find((user) => user.id === String(id));
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
