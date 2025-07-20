import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ForgotPasswordCommand } from '../commands';
import { IUserRepository } from '@domain/users/interfaces';
import { JwtToken, UserToken, MailToken } from '@infrastructure/di';
import { IJwtService } from '@domain/auth/interfaces/jwt.service.interface';
import { UserInactiveException } from '@domain/common/exceptions';
import { IMailService } from '@domain/mail/interfaces/mail.service.interface';
import { envs } from 'src/config/envs.config';

@Injectable()
export class ForgotPasswordHandler {
  constructor(
    @Inject(UserToken)
    private readonly userRepository: IUserRepository,
    @Inject(JwtToken)
    private readonly jwtService: IJwtService,
    @Inject(MailToken)
    private readonly emailService: IMailService,
  ) {}
  async execute(command: ForgotPasswordCommand) {
    const response = await this.userRepository.findByEmail(command.email);
    if (!response || !response.user) {
      throw new NotFoundException('User not found');
    }
    const user = response.user;
    if (!user.IsActive) {
      throw new UserInactiveException();
    }
    const token = this.jwtService.generateResetPasswordToken(user.Id);
    const expiresIn = envs.jwt.forgotPassword.expiration;
    const link = `${envs.frontend.url}${envs.frontend.resetPasswordPath}?token=${token}`;
    await this.emailService.sendMail(
      user.Email,
      'Reset your password',
      { link, name: user.Name, expiresIn },
      'users/forgot-password',
    );
  }
}
