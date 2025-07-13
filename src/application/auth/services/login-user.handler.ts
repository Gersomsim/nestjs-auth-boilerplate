import * as bcrypt from 'bcrypt';
import { Injectable, Inject } from '@nestjs/common';
import { LoginCommand } from '../commands/login.command';
import { JwtToken, UserToken } from '@infrastructure/di';
import { IUserRepository } from '@domain/users/interfaces';
import { InvalidCredentialsException } from '@domain/common/exceptions/invalid-credentials.exception';
import { IJwtService } from '@domain/auth/interfaces/jwt.service.interface';
import { UserInactiveException } from '@domain/common/exceptions';

@Injectable()
export class LoginUserHandler {
  constructor(
    @Inject(UserToken)
    private readonly userRepository: IUserRepository,
    @Inject(JwtToken)
    private readonly jwtService: IJwtService,
  ) {}

  async execute(command: LoginCommand) {
    const response = await this.userRepository.findByEmail(command.email);
    if (!response || !response.user) throw new InvalidCredentialsException();
    const { user, passwordHash } = response;
    if (!user.IsActive) throw new UserInactiveException();
    const isPasswordValid = await bcrypt.compare(
      command.password,
      passwordHash,
    );
    if (!isPasswordValid) throw new InvalidCredentialsException();
    return {
      user,
      accessToken: this.jwtService.generateToken(user.Id),
      refreshToken: this.jwtService.generateRefreshToken(user.Id),
    };
  }
}
