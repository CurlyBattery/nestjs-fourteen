import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from '../auth/dto/login.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(createUserDto.password, salt);
    const newUser = this.usersRepository.create({
      ...createUserDto,
      password: hashPassword,
    });
    const user = await this.usersRepository.save(newUser);
    delete user.password;
    return user;
  }

  async findOne(data: Omit<LoginDto, 'password'>): Promise<User> {
    const user = await this.usersRepository.findOneBy({ email: data.email });
    if (!user) {
      throw new UnauthorizedException('Could`t find user');
    }
    return user;
  }
}
