import { ActiveUserCommand } from '../commands';
import { Inject, Injectable } from '@nestjs/common';
import { UserToken } from '@infrastructure/di';
import { IUserRepository } from '@domain/users/interfaces';
import { User } from '@domain/users/entities/user.entity';
import { NotFoundException } from '@domain/common/exceptions';

@Injectable()
export class ActiveUserHandler {
  constructor(
    @Inject(UserToken)
    private readonly userRepository: IUserRepository,
  ) {}
  async execute(command: ActiveUserCommand): Promise<User> {
    const user = await this.userRepository.findById(command.id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.toggleActive();
    const userUpdated = await this.userRepository.updateElement(user);
    return userUpdated;
  }
}
