export class UserModel {
  id: string;
  name: string;
  email: string;
  isVerified: boolean;
  isActive: boolean;
}

export class CreateUserModel {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUserModel extends Partial<CreateUserModel> {
  verifiedAt?: Date;
  isVerified?: boolean;
  isActive?: boolean;
}
