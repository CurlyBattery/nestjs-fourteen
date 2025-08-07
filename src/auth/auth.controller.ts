import { Body, Controller, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { JwtGuard } from './guards/jwt.guard';
import { Enable2FAType } from './types/payload.type';
import { ValidateTokenDto } from './dto/validate-token.dto';
import { UpdateResult } from 'typeorm';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('enable-2fa')
  @UseGuards(JwtGuard)
  enable2FA(@Req() req: any): Promise<Enable2FAType> {
    console.log(req.user);
    return this.authService.enable2FA(req.user.userId);
  }

  @Post('validate-2fa')
  @UseGuards(JwtGuard)
  validate2FA(
    @Req() req: any,
    @Body() validateTokenDto: ValidateTokenDto,
  ): Promise<{ verified: boolean }> {
    return this.authService.validate2FAToken(
      req.user.userId,
      validateTokenDto.token,
    );
  }

  @Patch('disable-2fa')
  @UseGuards(JwtGuard)
  disable(@Req() req: any): Promise<UpdateResult> {
    return this.authService.disable2FA(req.user.userId);
  }
}
