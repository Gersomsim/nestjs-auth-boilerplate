import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { envs } from 'src/config/envs.config';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { UserRepository } from '../../../user/domain/repository/user.repository';
import { IUserRepository } from '../../../user/domain/repository/user.repository.interface';
import { UserModel } from '../../../user/domain/models/user.model';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: IUserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: envs.jwt.secretRefresh,
    });
  }

  async validate(payload: JwtPayload): Promise<UserModel> {
    if (payload.type !== 'refresh') {
      throw new UnauthorizedException('Invalid token');
    }
    const { id } = payload;
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }
    return user;
  }
}
