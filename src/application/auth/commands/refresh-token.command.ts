export class RefreshTokenCommand {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly isVerified: boolean,
    public readonly isActive: boolean,
    public readonly verifiedAt?: Date,
  ) {}
}
