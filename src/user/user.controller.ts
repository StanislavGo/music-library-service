import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, BadRequestException, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { validate } from 'uuid';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createUserDto: CreateUserDto) {
    if (createUserDto.login.length === 0 || createUserDto.password.length === 0) {
      throw new BadRequestException("request body does not contain required fields");
    } else {
      return this.userService.create(createUserDto);
    }
  }

  @Get()
  @HttpCode(200)
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id') id: string) {
    if(!validate(id)) {
      throw new BadRequestException("id is not valid");
    } else if (this.userService.findOne(id) === undefined) {
      throw new NotFoundException("user with such id does not exist");
    }
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
