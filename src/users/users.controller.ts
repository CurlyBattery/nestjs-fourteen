import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  @Get()
  @UseGuards(JwtGuard)
  @ApiBearerAuth('JWT-auth')
  getProfile(@Req() request: Request) {
    return request.user;
  }
}
