import { IMailService } from '@domain/mail/interfaces/mail.service.interface';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { TemplateRendererService } from './template-render.service';
import { envs } from 'src/config/envs.config';

@Injectable()
export class MailAdapter implements IMailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly templateRenderService: TemplateRendererService,
  ) {
    this.templateRenderService.clearCache();
  }
  private data() {
    return {
      url: envs.frontend.url,
      logo: 'https://d1oco4z2z1fhwp.cloudfront.net/templates/default/7056/illustration_png-03.png',
      emailContact: envs.api.email,
    };
  }

  async sendMail(
    to: string,
    subject: string,
    data: any,
    template: string,
  ): Promise<void> {
    const context = {
      info: this.data(),
      data,
    };
    const html = await this.templateRenderService.renderTemplate(
      template,
      context,
    );

    try {
      await this.mailerService.sendMail({
        to,
        subject,
        text: html,
        html,
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to send email');
    }
  }
}
