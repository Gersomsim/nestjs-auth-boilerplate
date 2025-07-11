import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { envs } from 'src/config/envs.config';
import { UserModel } from '../../../user/domain/models/user.model';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { UserRepository } from '../../../user/domain/repository/user.repository';
import { UserRepositoryInterface } from '../../../user/domain/repository/user.repository.interface';

@Injectable()
export class JwtResetPasswordStrategy extends PassportStrategy(
  Strategy,
  'jwt-reset-password',
) {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepositoryInterface,
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
    const user = await this.userRepository.findByEmail(id);
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }
    return user;
  }
}
