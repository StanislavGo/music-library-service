import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
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
    const id = v4()
    const newUser: UserEntity = new UserEntity({
      id,
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
    const indexOfCurrentUser = USERS_DB.indexOf(currentUser);
    const currentUserPassword = currentUser.password;
    
    if (currentUserPassword === oldPassword) {
      USERS_DB[indexOfCurrentUser].password = newPassword;
      USERS_DB[indexOfCurrentUser].updatedAt = Date.now();
      USERS_DB[indexOfCurrentUser].version++;

      return USERS_DB[indexOfCurrentUser];
    } else {
      throw new ForbiddenException("oldPassword is wrong");
    }
  }

  remove(id: string) {
    if (this.findOne(id)) {
      USERS_DB.splice(USERS_DB.indexOf(this.findOne(id)), 1);
    } else {
      throw new NotFoundException("User not found");
    }
  }
}
