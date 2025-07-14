import { IJwtService } from '@domain/auth/interfaces/jwt.service.interface';
import { IMailService } from '@domain/mail/interfaces/mail.service.interface';
import { JwtToken } from '@infrastructure/di';
import { MailToken } from '@infrastructure/di/tokens/mail/mail.token';
import { Inject, Injectable } from '@nestjs/common';
import { ResendEmailVerificationCommand } from '../../auth/commands/resent-email-verification.command';
import { envs } from 'src/config/envs.config';

@Injectable()
export class ResendEmailVerificationHandler {
  constructor(
    @Inject(MailToken)
    private readonly mailService: IMailService,
    @Inject(JwtToken)
    private readonly jwtService: IJwtService,
  ) {}

  async execute(command: ResendEmailVerificationCommand) {
    const verificationToken = this.jwtService.generateResetPasswordToken(
      command.userId,
    );
    const link = `${envs.frontend.url}${envs.frontend.confirmMailPath}?token=${verificationToken}`;
    const expiresIn = envs.jwt.forgotPassword.expiration;

    await this.mailService.sendMail(
      command.email,
      'Email Verification',
      { link, name: command.name, expiresIn },
      'users/email-verification',
    );
  }
}
