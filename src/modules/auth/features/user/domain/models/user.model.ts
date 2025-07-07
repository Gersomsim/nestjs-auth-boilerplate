export class UserModel {
  id: string;
  name: string;
  email: string;
  password?: string;
}

export class CreateUserModel {
  name: string;
  email: string;
  password: string;
}

export type UpdateUserModel = Partial<CreateUserModel>;
