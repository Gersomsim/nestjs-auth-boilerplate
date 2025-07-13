import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ForgotPasswordCommand } from '../commands';
import { IUserRepository } from '@domain/users/interfaces';
import { JwtToken, UserToken, MailToken } from '@infrastructure/di';
import { IJwtService } from '@domain/auth/interfaces/jwt.service.interface';
import { UserInactiveException } from '@domain/common/exceptions';
import { IMailService } from '@domain/mail/interfaces/mail.service.interface';

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
    await this.emailService.sendMail(
      user.Email,
      'Reset your password',
      `Click <a href="http://localhost:3000/reset-password/${token}">here</a> to reset your password`,
    );
  }
}
