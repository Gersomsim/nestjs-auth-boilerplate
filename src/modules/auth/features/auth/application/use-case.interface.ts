import {
  CreateUserModel,
  UserModel,
} from '../../user/domain/models/user.model';
import { ChangePasswordDto } from '../infrastructure/dto/change-password.dto';
import { LoginResponse } from './interfaces';

export interface IUseCaseService {
  login(email: string, password: string): Promise<LoginResponse>;
  register(user: CreateUserModel): Promise<LoginResponse>;
  logout(): void;
  refreshToken(user: UserModel): LoginResponse;
  verifyToken(i: string): boolean;
  forgotPassword(email: string): void;
  resetPassword(
    user: UserModel,
    password: string,
  ): Promise<{ message: string }>;
  changePassword(
    user: UserModel,
    changePasswordDto: ChangePasswordDto,
  ): Promise<{ message: string }>;
  verifyEmail(user: UserModel): Promise<{ message: string; user: UserModel }>;
  // send emails
  resendVerificationEmail(email: string): { message: string };
  sendPasswordResetEmail(email: string): void;
  sendVerificationEmail(email: string): void;
}
