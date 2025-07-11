import * as bcrypt from 'bcrypt';
import { Injectable, Inject } from '@nestjs/common';
import { LoginCommand } from '../commands/login.command';
import { UserToken } from '@infrastructure/di';
import { IUserRepository } from '@domain/users/interfaces';

@Injectable()
export class LoginUserHandler {
  constructor(
    @Inject(UserToken)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(command: LoginCommand) {
    const response = await this.userRepository.findByEmail(command.email);
    if (!response) throw new Error('User not found');
    const { user, passwordHash } = response;
    const isPasswordValid = await bcrypt.compare(
      command.password,
      passwordHash,
    );
    if (!isPasswordValid) throw new Error('Invalid password');
    return user;
  }
}
