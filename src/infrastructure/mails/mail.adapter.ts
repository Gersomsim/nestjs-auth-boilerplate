import { IMailService } from '@domain/mail/interfaces/mail.service.interface';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class MailAdapter implements IMailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(
    to: string,
    subject: string,
    data: any,
    template?: string,
  ): Promise<void> {
    const html = JSON.stringify(data);
    try {
      console.log(to, subject, html);
      await this.mailerService.sendMail({ to, subject, text: html });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to send email');
    }
  }
}
