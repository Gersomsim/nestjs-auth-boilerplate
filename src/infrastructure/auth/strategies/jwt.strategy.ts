import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { envs } from 'src/config/envs.config';
import { JwtPayload } from '@infrastructure/interfaces/jwt-payload.interface';
import { TypeormUserRepository } from '@infrastructure/databases/typeorm/user/repositories/typeorm-user.repository';
import { User } from '@domain/users/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userRepository: TypeormUserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: envs.jwt.secret,
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    if (payload.type !== 'access') {
      throw new UnauthorizedException('Invalid token');
    }
    const user = await this.userRepository.findById(payload.id);
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }
    if (!user.IsActive) {
      throw new UnauthorizedException(
        'User is not active, contact support to activate your account',
      );
    }
    return user;
  }
}
