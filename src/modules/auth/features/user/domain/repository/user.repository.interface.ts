import type {
  CreateUserModel,
  UpdateUserModel,
  UserModel,
} from '../models/user.model';

export interface UserRepositoryInterface {
  findAll(): Promise<UserModel[]>;
  findById(id: string): Promise<UserModel>;
  create(user: CreateUserModel): Promise<UserModel>;
  update(id: string, user: UpdateUserModel): Promise<UserModel>;
  delete(id: string): Promise<UserModel>;
  findByEmail(email: string): Promise<UserModel | null>;
}
