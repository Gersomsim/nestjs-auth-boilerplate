import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { envs } from 'src/config/envs.config';
import { UserModel } from '../../../user/domain/models/user.model';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { AuthRepository } from '../../domain/repositories/auth.repository';
import { IAuthRepository } from '../../domain/repositories/repository.interface';

@Injectable()
export class JwtResetPasswordStrategy extends PassportStrategy(
  Strategy,
  'jwt-reset-password',
) {
  constructor(
    @Inject(AuthRepository)
    private readonly repository: IAuthRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: envs.jwt.secretForgotPassword,
    });
  }

  async validate(payload: JwtPayload): Promise<UserModel> {
    const { id, type } = payload;
    if (type !== 'forgot-password') {
      throw new UnauthorizedException('Invalid token');
    }
    const user = await this.repository.findByEmail(id);
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }
    return user;
  }
}
