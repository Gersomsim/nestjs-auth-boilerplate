import { IJwtService } from '@domain/auth/interfaces/jwt.service.interface';
import { User } from '@domain/users/entities/user.entity';
import { IUserRepository } from '@domain/users/interfaces';
import { JwtToken, UserToken } from '@infrastructure/di';
import { Inject, Injectable } from '@nestjs/common';
import { VerifyTokenCommand } from '../commands';
import { InvalidTokenException } from '@domain/common/exceptions/invalid-token.exception';
import { UserInactiveException } from '@domain/common/exceptions';

@Injectable()
export class VerifyTokenHandler {
  constructor(
    @Inject(JwtToken)
    private readonly jwtService: IJwtService,
    @Inject(UserToken)
    private readonly userRepository: IUserRepository,
  ) {}
  async execute(command: VerifyTokenCommand): Promise<User> {
    const payload = await this.jwtService.verifyToken(command.token);
    if (payload.type !== 'access') {
      throw new InvalidTokenException('Invalid token for this type');
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
