import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ArtistsService } from '../artists/artists.service';
import { async } from 'rxjs';
import { PayloadType } from './types/payload.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly artistsService: ArtistsService,
  ) {}

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const user = await this.usersService.findOne({ email: loginDto.email });

    const passwordMatched = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (passwordMatched) {
      delete user.password;

      const payload: PayloadType = { email: user.email, userId: user.id };
      const artist = await this.artistsService.findArtist(user.id);
      if (artist) {
        payload.artistId = artist.id;
      }

      const accessToken = this.jwtService.sign(payload);

      return { accessToken };
    } else {
      throw new UnauthorizedException('Password does`t match');
    }
  }
}
