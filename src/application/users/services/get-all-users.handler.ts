import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '@domain/users/interfaces';
import { UserToken } from '@infrastructure/di';
import { GetAllUsersQuery } from '../queries';
import { User } from '@domain/users/entities/user.entity';

@Injectable()
export class GetAllUsersHandler {
  constructor(
    @Inject(UserToken)
    private readonly userRepository: IUserRepository,
  ) {}
  async execute(query: GetAllUsersQuery): Promise<User[]> {
    const users = await this.userRepository.findAll();
    return users;
  }
}
