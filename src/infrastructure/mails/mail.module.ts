import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { envs } from 'src/config/envs.config';
import { MailTokenProvider } from '@infrastructure/di/tokens/mail/mail.token';
import { TemplateRendererService } from './template-render.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: envs.mail.host,
        port: envs.mail.port,
        auth: {
          user: envs.mail.user,
          pass: envs.mail.password,
        },
      },
      defaults: {
        from: envs.api.email,
      },
    }),
  ],
  providers: [MailTokenProvider, TemplateRendererService],
  exports: [MailTokenProvider],
})
export class MailModule {}
