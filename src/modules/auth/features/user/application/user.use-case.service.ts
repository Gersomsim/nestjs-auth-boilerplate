import { Inject, Injectable } from '@nestjs/common';
import type {
  CreateUserModel,
  UpdateUserModel,
  UserModel,
} from '../domain/models/user.model';
import { UserRepository } from '../domain/repository/user.repository';
import type { UserRepositoryInterface } from '../domain/repository/user.repository.interface';
import type { UserUseCaseInterface } from './user.use-case.interface';

@Injectable()
export class UserUseCaseService implements UserUseCaseInterface {
  constructor(
    @Inject(UserRepository)
    private readonly repository: UserRepositoryInterface,
  ) {}
  findAll(): Promise<UserModel[]> {
    return this.repository.findAll();
  }
  findById(id: string): Promise<UserModel> {
    return this.repository.findById(id);
  }
  create(user: CreateUserModel): Promise<UserModel> {
    return this.repository.create(user);
  }
  update(id: string, user: UpdateUserModel): Promise<UserModel> {
    return this.repository.update(id, user);
  }
  delete(id: string): Promise<UserModel> {
    return this.repository.delete(id);
  }
}
