import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserModel } from '../../../user/domain/models/user.model';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { UserRepository } from '../../../user/domain/repository/user.repository';
import { UserRepositoryInterface } from '../../../user/domain/repository/user.repository.interface';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { envs } from 'src/config/envs.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepositoryInterface,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: envs.jwt.secret,
    });
  }

  // Este se ejecuta cuando se verifica el token y es valido
  async validate(payload: JwtPayload): Promise<UserModel> {
    const { id } = payload;
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }
    return user;
  }
}
