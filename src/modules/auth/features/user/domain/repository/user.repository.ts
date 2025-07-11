import { OrmUserRepository } from '@application/repositories/modules/auth/orm-user.reporitory';
import type { IOrmUserRepository } from '@domain/repository';
import { Inject, Injectable } from '@nestjs/common';
import type {
  CreateUserModel,
  UpdateUserModel,
  UserModel,
} from '../models/user.model';
import type { IUserRepository } from './user.repository.interface';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @Inject(OrmUserRepository)
    private readonly userRepository: IOrmUserRepository,
  ) {}

  findAll(): Promise<UserModel[]> {
    return this.userRepository.getAllElements();
  }
  findById(id: string): Promise<UserModel> {
    return this.userRepository.getElementById(id);
  }
  create(user: CreateUserModel): Promise<UserModel> {
    return this.userRepository.newElement(user);
  }
  update(id: string, user: UpdateUserModel): Promise<UserModel> {
    return this.userRepository.updateElementById(id, user);
  }
  delete(id: string): Promise<UserModel> {
    return this.userRepository.deleteElementById(id);
  }
}
