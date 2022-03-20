import {
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Op } from 'sequelize';
import { CreateUserDto } from './requests/create-user.dto';
import { UpdateUserDto } from './requests/update-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY') readonly usersRepository: typeof User,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.usersRepository.findAll({
      attributes: { exclude: ['password'] },
    });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    if (await this.findByEmail(createUserDto.email)) {
      throw new UnprocessableEntityException(`The email has already exists.`);
    }

    return await this.usersRepository.create(createUserDto);
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findByPk(id, {
      attributes: { exclude: ['password'] },
    });

    if (user) return user;
    throw new NotFoundException(`User not found`);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<any> {
    await this.findOne(id);

    if (await this.findByEmail(updateUserDto.email, id)) {
      throw new UnprocessableEntityException(`The email has already exists.`);
    }

    return await this.usersRepository.update(updateUserDto, {
      where: { id: id },
      individualHooks: true,
    });
  }

  async findByEmail(email: string, exceptId?: number): Promise<User> {
    const where = { email };

    if (exceptId) {
      where['id'] = { [Op.ne]: exceptId };
    }

    return await this.usersRepository.findOne({
      attributes: { exclude: ['password'] },
      where,
    });
  }

  async destroy(id: number): Promise<number> {
    await this.findOne(id);

    return this.usersRepository.destroy({ where: { id: id } });
  }
}
