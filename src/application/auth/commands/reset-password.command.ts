export class ResetPasswordCommand {
  constructor(
    public readonly password: string,
    public readonly userId: string,
    public readonly email: string,
    public readonly name: string,
    public readonly isVerified: boolean,
    public readonly isActive: boolean,
  ) {}
}
