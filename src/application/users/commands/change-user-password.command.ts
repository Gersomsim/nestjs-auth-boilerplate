export class ChangeUserPasswordCommand {
  constructor(
    public readonly email: string,
    public readonly password: string,
    public readonly newPassword: string,
  ) {}
}
