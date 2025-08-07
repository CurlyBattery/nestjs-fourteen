import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { v4 as uuid4 } from 'uuid';

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

    const apiKey = uuid4();

    const newUser = this.usersRepository.create({
      ...createUserDto,
      password: hashPassword,
      apiKey,
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

  async findById(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    return user;
  }

  async updateSecretKey(userId: number, secret: string): Promise<UpdateResult> {
    return this.usersRepository.update(userId, {
      twoFASecret: secret,
      enable2FA: true,
    });
  }

  async disable2FA(userId: number) {
    return this.usersRepository.update(userId, {
      twoFASecret: null,
      enable2FA: false,
    });
  }

  async findByApiKey(apiKey: string): Promise<User> {
    return this.usersRepository.findOneBy({ apiKey });
  }
}
