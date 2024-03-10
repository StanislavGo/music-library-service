import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { USERS_DB } from './user.database';
import { v4 } from 'uuid';
import { plainToClass } from 'class-transformer';
import { SerializedUser } from './serializedUser';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    const newUser: UserEntity = new UserEntity({
      id: v4(),
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    USERS_DB.push(newUser);
    return newUser;
  }

  findAll(): UserEntity[] {
    return USERS_DB.map((user) => plainToClass(SerializedUser, user));
  }

  findOne(id: string) {
    const userToFind = USERS_DB.find((user) => user.id === id);
    return plainToClass(SerializedUser, userToFind);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const oldPassword = updateUserDto.oldPassword;
    const newPassword = updateUserDto.newPassword;
    const currentUser = USERS_DB.find((user) => user.id === id);
    const currentUserPassword = currentUser.password;
    
    if (currentUserPassword === oldPassword) {
      currentUser.password = newPassword;
      currentUser.updatedAt = Date.now();
      currentUser.version++;
      console.log(currentUser);
    } else {
      throw new ForbiddenException("oldPassword is wrong");
    }
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
