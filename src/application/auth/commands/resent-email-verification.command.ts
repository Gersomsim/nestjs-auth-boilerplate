export class ResendEmailVerificationCommand {
  constructor(
    public readonly userId: string,
    public readonly email: string,
    public readonly name: string,
  ) {}
}
