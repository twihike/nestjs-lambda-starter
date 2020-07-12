import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserCreate } from './dto/user-create.dto';
import { UserUpdate } from './dto/user-update.dto';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  async create(user: UserCreate): Promise<User> {
    const entity = new User();
    Object.assign(entity, user, { password: 'encrypted' });
    const result = await this.usersRepo.save(entity);
    return result;
  }

  async updateByName(name: string, user: UserUpdate): Promise<User> {
    const toUpdate = await this.usersRepo.findOneOrFail(
      { name },
      { lock: { mode: 'optimistic', version: user.version } },
    );

    const updated = Object.assign(toUpdate, user, { password: 'encrypted' });
    const result = await this.usersRepo.save(updated);
    return result;
  }

  async removeByName(name: string): Promise<User> {
    const user = await this.usersRepo.findOneOrFail({ name });

    const result = await this.usersRepo.remove(user);
    return result;
  }

  async softRemoveByName(name: string): Promise<User> {
    const user = await this.usersRepo.findOneOrFail({ name });

    const result = await this.usersRepo.softRemove(user);
    return result;
  }

  async findAll(): Promise<User[]> {
    const users = await this.usersRepo.find();
    return users;
  }

  async findOneByName(name: string): Promise<User> {
    const user = await this.usersRepo.findOne({ name });
    return user;
  }
}
