import { Inject, Injectable } from '@nestjs/common';
import { JwtToken, UserToken } from '@infrastructure/di';
import { IUserRepository } from '@domain/users/interfaces';
import { User } from '@domain/users/entities/user.entity';
import { UserVerifyCommand } from '../commands';
import { IJwtService } from '@domain/auth/interfaces/jwt.service.interface';
import { NotFoundException } from '@domain/common/exceptions';

@Injectable()
export class VerifyUserHandler {
  constructor(
    @Inject(UserToken)
    private readonly userRepository: IUserRepository,
    @Inject(JwtToken)
    private readonly jwtService: IJwtService,
  ) {}
  async execute(command: UserVerifyCommand): Promise<User> {
    const payload = await this.jwtService.verifyResetPasswordToken(
      command.token,
    );
    const user = await this.userRepository.findById(payload.id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.verifyAccount();
    const userUpdated = await this.userRepository.updateElement(user);
    return userUpdated;
  }
}
