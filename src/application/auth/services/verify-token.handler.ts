import { IJwtService } from '@domain/auth/interfaces/jwt.service.interface';
import { User } from '@domain/users/entities/user.entity';
import { IUserRepository } from '@domain/users/interfaces';
import { JwtToken, UserToken } from '@infrastructure/di';
import { Inject, Injectable } from '@nestjs/common';
import { VerifyTokenCommand } from '../commands';
import { BadRequestException } from '@domain/common/exceptions';
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
      throw new BadRequestException('Invalid token for this type');
    }
    const user = await this.userRepository.findById(payload.id);
    if (!user) {
      throw new BadRequestException('Invalid token');
    }
    if (!user.IsActive) {
      throw new UserInactiveException();
    }
    return user;
  }
}
