export interface IMailService {
  sendMail(
    to: string,
    subject: string,
    text: string,
    template?: string,
  ): Promise<void>;
}
