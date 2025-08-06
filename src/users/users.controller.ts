import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtGuard } from '../auth/guards/jwt.guard';

@Controller('users')
export class UsersController {
  @Get()
  @UseGuards(JwtGuard)
  getProfile(@Req() request: Request) {
    return request.user;
  }
}
