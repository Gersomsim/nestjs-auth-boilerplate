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

  public static create(name: string, email: string, id?: string) {
    const idUser = id || crypto.randomUUID();
    return new User(idUser, name, email, false, true);
  }
  public toggleActive() {
    this.isActive = !this.isActive;
  }
  public verifyAccount() {
    this.isVerified = true;
    this.verifiedAt = new Date();
  }
}
