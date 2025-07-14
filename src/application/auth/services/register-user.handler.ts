import { Injectable, Inject } from '@nestjs/common';
import { RegisterUserCommand } from '../commands/register-user.command';
import { JwtToken, MailToken, UserToken } from '@infrastructure/di';
import { IUserRepository } from '@domain/users/interfaces';
import { User } from '@domain/users/entities/user.entity';
import { IJwtService } from '@domain/auth/interfaces/jwt.service.interface';
import { IMailService } from '@domain/mail/interfaces/mail.service.interface';
import { envs } from 'src/config/envs.config';

@Injectable()
export class RegisterUserHandler {
  constructor(
    @Inject(UserToken)
    private readonly userRepository: IUserRepository,
    @Inject(JwtToken)
    private readonly jwtService: IJwtService,
    @Inject(MailToken)
    private readonly emailService: IMailService,
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
    const url = `${envs.frontend.url}${envs.frontend.confirmMailPath}?token=${accessToken}`;
    await this.emailService.sendMail(
      userCreated.Email,
      'Welcome to the platform',
      { token: url },
      'users/welcome.template',
    );
    return {
      user: userCreated,
      accessToken,
      refreshToken,
    };
  }
}
