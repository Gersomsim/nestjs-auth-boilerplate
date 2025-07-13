import { Inject, Injectable } from '@nestjs/common';
import { ResetPasswordCommand } from '../commands';
import { IUserRepository } from '@domain/users/interfaces';
import { UserToken } from '@infrastructure/di';
import { User } from '@domain/users/entities/user.entity';

@Injectable()
export class ResetPasswordHandler {
  constructor(
    @Inject(UserToken)
    private readonly userRepository: IUserRepository,
  ) {}
  async execute(command: ResetPasswordCommand): Promise<User> {
    const user = new User(
      command.userId,
      command.name,
      command.email,
      command.isVerified,
      command.isActive,
    );
    const updatedUser = await this.userRepository.updateElement(
      user,
      command.password,
    );
    return updatedUser;
  }
}
