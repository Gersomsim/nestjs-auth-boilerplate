import { Injectable, Inject } from '@nestjs/common';
import { RegisterUserCommand } from '../commands/register-user.command';
import { UserToken } from '@infrastructure/di';
import { IUserRepository } from '@domain/users/interfaces';
import { User } from '@domain/users/entities/user.entity';

@Injectable()
export class RegisterUserHandler {
  constructor(
    @Inject(UserToken)
    private readonly userRepository: IUserRepository,
  ) {}
  async execute(command: RegisterUserCommand) {
    const user = User.create(command.name, command.email);
    const userCreated = await this.userRepository.createElement(
      user,
      command.password,
    );
    return userCreated;
  }
}
