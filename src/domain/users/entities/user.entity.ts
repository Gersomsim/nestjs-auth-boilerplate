export class User {
  private id: string;
  private name: string;
  private email: string;
  private isVerified: boolean;
  private isActive: boolean;
  private verifiedAt?: Date;

  constructor(
    id: string,
    name: string,
    email: string,
    isVerified: boolean,
    isActive: boolean,
    verifiedAt?: Date,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.isVerified = isVerified;
    this.isActive = isActive;
    this.verifiedAt = verifiedAt;
  }

  public static create(name: string, email: string) {
    const id = crypto.randomUUID();
    return new User(id, name, email, false, true);
  }
  public activateAccount() {
    if (this.isActive) {
      throw new Error('User already activated');
    }
    this.isActive = true;
  }
  public deactivateAccount() {
    if (!this.isActive) {
      throw new Error('User already deactivated');
    }
    this.isActive = false;
  }
  public verifyAccount() {
    if (this.isVerified) {
      throw new Error('User already verified');
    }
    this.isVerified = true;
    this.verifiedAt = new Date();
  }
  // Getters
  public get IsActive() {
    return this.isActive;
  }
  public get IsVerified() {
    return this.isVerified;
  }
  public get Id() {
    return this.id;
  }
  public get Name() {
    return this.name;
  }
  public get Email() {
    return this.email;
  }
  public get VerifiedAt() {
    return this.verifiedAt;
  }
}
