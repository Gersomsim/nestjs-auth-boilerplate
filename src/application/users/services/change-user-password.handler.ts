import * as bcrypt from 'bcrypt';
import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '@domain/users/interfaces';
import { UserToken } from '@infrastructure/di';
import { ChangeUserPasswordCommand } from '../commands';
import { User } from '@domain/users/entities/user.entity';
import {
  InvalidCredentialsException,
  NotFoundException,
} from '@domain/common/exceptions';

@Injectable()
export class ChangeUserPasswordHandler {
  constructor(
    @Inject(UserToken)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(command: ChangeUserPasswordCommand): Promise<User> {
    const response = await this.userRepository.findByEmail(command.email);
    if (!response) throw new NotFoundException('User not found');
    const { user, passwordHash } = response;
    const isPasswordValid = await bcrypt.compare(
      command.password,
      passwordHash,
    );
    if (!isPasswordValid) throw new InvalidCredentialsException();
    await this.userRepository.updateElement(user, command.newPassword);
    return user;
  }
}
