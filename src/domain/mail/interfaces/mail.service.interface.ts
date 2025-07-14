export interface IMailService {
  sendMail(
    to: string,
    subject: string,
    data: any,
    template: string,
  ): Promise<void>;
}
