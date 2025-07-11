import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../interfaces/user.repository.interface';
import { User } from '../entities/user.entity';
import { UserToken } from '@infrastructure/di';
import { UserAlreadyExistsException } from '@domain/common/exceptions/user-already-exists.exception';

@Injectable()
export class UserRegistrationService {
  constructor(
    @Inject(UserToken)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(name: string, email: string, password: string) {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new UserAlreadyExistsException(email);
    }
    const newUser = User.create(name, email);
    await this.userRepository.createElement(newUser, password);
    // TODO: Send verification and welcome email
    return newUser;
  }
}
