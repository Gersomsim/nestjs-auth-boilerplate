import { IJwtService } from '@domain/auth/interfaces/jwt.service.interface';
import { JwtToken } from '@infrastructure/di';
import { Inject, Injectable } from '@nestjs/common';
import { RefreshTokenCommand } from '../commands';
import { User } from '@domain/users/entities/user.entity';

@Injectable()
export class RefreshTokenHandler {
  constructor(
    @Inject(JwtToken)
    private readonly jwtService: IJwtService,
  ) {}

  execute(command: RefreshTokenCommand): {
    user: User;
    accessToken: string;
    refreshToken: string;
  } {
    const user = new User(
      command.id,
      command.name,
      command.email,
      command.isVerified,
      command.isActive,
    );
    const accessToken = this.jwtService.generateToken(user.Id);
    const refreshToken = this.jwtService.generateRefreshToken(user.Id);
    return {
      user: user,
      accessToken,
      refreshToken,
    };
  }
}
