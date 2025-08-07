import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-bearer';

import { AuthService } from '../auth.service';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(apiKey: string) {
    console.log(apiKey);
    const user = await this.authService.validateUserByApiKey(apiKey);
    console.log(user);
    if (!user) {
      throw new UnauthorizedException();
    } else {
      return user;
    }
  }
}
