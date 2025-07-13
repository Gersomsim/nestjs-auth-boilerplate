import {
  InvalidTokenException,
  UserInactiveException,
} from '@domain/common/exceptions';
import { User } from '@domain/users/entities/user.entity';
import { TypeormUserRepository } from '@infrastructure/databases/typeorm/user/repositories/typeorm-user.repository';
import { JwtPayload } from '@infrastructure/interfaces/jwt-payload.interface';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { envs } from 'src/config/envs.config';

@Injectable()
export class JwtResetPasswordStrategy extends PassportStrategy(
  Strategy,
  'jwt-reset-password',
) {
  constructor(private readonly userRepository: TypeormUserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: envs.jwt.forgotPassword.secret,
    });
  }
  async validate(payload: JwtPayload): Promise<User> {
    if (payload.type !== 'forgot-password') {
      throw new InvalidTokenException('Invalid token for reset password');
    }
    const user = await this.userRepository.findById(payload.id);
    if (!user) {
      throw new InvalidTokenException('Invalid token');
    }
    if (!user.IsActive) {
      throw new UserInactiveException();
    }
    return user;
  }
}
