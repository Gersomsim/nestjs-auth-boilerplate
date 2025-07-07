import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryInterface } from '../domain/repository/user.repository.interface';
import { UserRepository } from '../domain/repository/user.repository';
import { UserUseCaseInterface } from './user.use-case.interface';
import { UserModel } from '../domain/models/user.model';

@Injectable()
export class UserUseCaseService implements UserUseCaseInterface {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepositoryInterface,
  ) {}
  findAll(): Promise<UserModel[]> {
    throw new Error('Method not implemented.');
  }
  findById(id: string): Promise<UserModel> {
    throw new Error('Method not implemented.');
  }
  create(user: UserModel): Promise<UserModel> {
    throw new Error('Method not implemented.');
  }
  update(user: UserModel): Promise<UserModel> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<UserModel> {
    throw new Error('Method not implemented.');
  }
}
