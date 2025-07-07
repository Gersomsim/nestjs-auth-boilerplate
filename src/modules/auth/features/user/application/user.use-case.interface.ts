import { UserModel } from '../domain/models/user.model';

export interface UserUseCaseInterface {
  findAll(): Promise<UserModel[]>;
  findById(id: string): Promise<UserModel>;
  create(user: UserModel): Promise<UserModel>;
  update(user: UserModel): Promise<UserModel>;
  delete(id: string): Promise<UserModel>;
}
