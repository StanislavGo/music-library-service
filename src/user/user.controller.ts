import { Controller, Get, Post, Body, Param, Delete, HttpCode, NotFoundException, ParseUUIDPipe, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { StatusCodes } from 'http-status-codes';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id', new ParseUUIDPipe({ version: "4" })) id: string): UserEntity {
    if (this.userService.findOne(id) === undefined) {
      throw new NotFoundException("user with such id does not exist");
    }
    return this.userService.findOne(id);
  }

  @Put(':id')
  update(@Param('id', new ParseUUIDPipe({ version: "4" })) id: string,
  @Body() updateUserDto: UpdateUserDto) {
    if (this.userService.findOne(id) === undefined) {
      throw new NotFoundException("user with such id does not exist");
    }
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe({ version: "4" })) id: string) {
    return this.userService.remove(id);
  }
}
