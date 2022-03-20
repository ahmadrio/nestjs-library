import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiResponse, TApiReponseDefault } from 'src/core/general/api-response';
import { CreateUserDto } from './requests/create-user.dto';
import { UpdateUserDto } from './requests/update-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async index(): Promise<TApiReponseDefault<User[]>> {
    return await ApiResponse.default(
      await this.usersService.findAll(),
      `Success get users data.`,
    );
  }

  @Post()
  async store(
    @Body() createUserDto: CreateUserDto,
  ): Promise<TApiReponseDefault<User>> {
    const createUser = await this.usersService.create(createUserDto);

    return await ApiResponse.default(
      await this.usersService.findOne(createUser.id),
      `Success create user.`,
    );
  }

  @Get(':id')
  async show(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<TApiReponseDefault<User>> {
    return await ApiResponse.default(
      await this.usersService.findOne(id),
      `Success get user.`,
    );
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<TApiReponseDefault<User>> {
    await this.usersService.update(id, updateUserDto);

    return await ApiResponse.default(
      await this.usersService.findOne(id),
      `Success update user.`,
    );
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<TApiReponseDefault<[]>> {
    await this.usersService.destroy(id);

    return await ApiResponse.default([], `Success delete user.`);
  }
}
