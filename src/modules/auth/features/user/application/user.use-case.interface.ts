import type {
  CreateUserModel,
  UpdateUserModel,
  UserModel,
} from '../domain/models/user.model';

export interface UserUseCaseInterface {
  findAll(): Promise<UserModel[]>;
  findById(id: string): Promise<UserModel>;
  create(user: CreateUserModel): Promise<UserModel>;
  update(id: string, user: UpdateUserModel): Promise<UserModel>;
  delete(id: string): Promise<UserModel>;
}
