import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthRepository } from '../domain/repositories/auth.repository';
import { UserRepository } from '../../user/domain/repository/user.repository';
import { UserRepositoryInterface } from '../../user/domain/repository/user.repository.interface';
import {
  CreateUserModel,
  UserModel,
} from '../../user/domain/models/user.model';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService implements AuthRepository {
  constructor(
    @Inject(UserRepository)
    private readonly repository: UserRepositoryInterface,
    private readonly jwtService: JwtService,
  ) {}
  async register(user: CreateUserModel): Promise<UserModel> {
    const passwordHash = await bcrypt.hash(user.password, 10);
    const newUser = { ...user, password: passwordHash };
    return this.repository.create(newUser);
  }
  logout(user: UserModel): Promise<void> {
    return Promise.resolve();
  }
  refreshToken(user: UserModel): Promise<UserModel> {
    throw new Error('Method not implemented.');
  }
  verifyToken(token: string): Promise<UserModel> {
    throw new Error('Method not implemented.');
  }
  forgotPassword(email: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  resetPassword(token: string, password: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  changePassword(user: UserModel, newPassword: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  verifyEmail(token: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  resendVerificationEmail(email: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  sendPasswordResetEmail(email: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  sendVerificationEmail(email: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async login(
    email: string,
    password: string,
  ): Promise<{
    user: UserModel;
    accessToken: string;
  }> {
    const user = await this.repository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const passwordHash = user.password ?? '';
    const isPasswordValid = await bcrypt.compare(password, passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      user,
      accessToken: this.getJwtToken({ id: user.id }),
    };
  }
  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
