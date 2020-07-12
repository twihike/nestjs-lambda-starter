import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';

import { UserCreate } from './dto/user-create.dto';
import { UserUpdate } from './dto/user-update.dto';
import { User } from './users.entity';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async create(@Body() input: UserCreate): Promise<User> {
    const user = await this.usersService.create(input);
    return user;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':name')
  async updateByName(
    @Param('name') name: string,
    @Body() input: UserUpdate,
  ): Promise<User> {
    const user = await this.usersService.updateByName(name, input);
    return user;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':name')
  async removeByName(@Param('name') name: string): Promise<User> {
    const user = await this.usersService.removeByName(name);
    return user;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll(): Promise<User[]> {
    const users = await this.usersService.findAll();
    return users;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':name')
  async findOneByName(@Param('name') name: string): Promise<User> {
    const user = await this.usersService.findOneByName(name);
    return user;
  }
}
