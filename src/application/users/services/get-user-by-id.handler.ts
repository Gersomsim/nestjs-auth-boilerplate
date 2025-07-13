import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '@domain/users/interfaces';
import { UserToken } from '@infrastructure/di';
import { User } from '@domain/users/entities/user.entity';
import { GetUserByIdQuery } from '../queries/get-user-by-id.query';

@Injectable()
export class GetUserByIdHandler {
  constructor(
    @Inject(UserToken)
    private readonly userRepository: IUserRepository,
  ) {}
  async execute(query: GetUserByIdQuery): Promise<User | null> {
    return this.userRepository.findById(query.userId);
  }
}
