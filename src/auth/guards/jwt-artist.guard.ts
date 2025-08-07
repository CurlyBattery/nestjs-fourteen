import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { PayloadType } from '../types/payload.type';

@Injectable()
export class JwtArtistGuard extends AuthGuard('jwt') implements CanActivate {
  constructor() {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  handleRequest<TUser = PayloadType>(err: any, user: any) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    console.log(user);

    if (user.artistId) {
      return user;
    }
    throw err || new UnauthorizedException('Is not an artist');
  }
}
