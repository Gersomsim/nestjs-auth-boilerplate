import { MailAdapter } from '@infrastructure/mails/mail.adapter';

export const MailToken = 'MailToken';

export const MailTokenProvider = {
  provide: MailToken,
  useClass: MailAdapter,
};
