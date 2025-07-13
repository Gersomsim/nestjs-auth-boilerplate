import { Injectable, Inject } from '@nestjs/common';
import { RegisterUserCommand } from '../commands/register-user.command';
import { JwtToken, UserToken } from '@infrastructure/di';
import { IUserRepository } from '@domain/users/interfaces';
import { User } from '@domain/users/entities/user.entity';
import { IJwtService } from '@domain/auth/interfaces/jwt.service.interface';

@Injectable()
export class RegisterUserHandler {
  constructor(
    @Inject(UserToken)
    private readonly userRepository: IUserRepository,
    @Inject(JwtToken)
    private readonly jwtService: IJwtService,
  ) {}
  async execute(command: RegisterUserCommand): Promise<{
    user: User;
    accessToken: string;
    refreshToken: string;
  }> {
    const user = User.create(command.name, command.email);
    const userCreated = await this.userRepository.createElement(
      user,
      command.password,
    );
    const accessToken = this.jwtService.generateToken(userCreated.Id);
    const refreshToken = this.jwtService.generateRefreshToken(userCreated.Id);
    return {
      user: userCreated,
      accessToken,
      refreshToken,
    };
  }
}
