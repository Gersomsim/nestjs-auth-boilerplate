import {
  CreateUserModel,
  UserModel,
} from '../../../user/domain/models/user.model';
import { AuthModel } from '../models/auth.model';

export interface AuthRepository {
  login(email: string, password: string): Promise<AuthModel>;
  register(user: CreateUserModel): Promise<AuthModel>;
  logout(user: UserModel): Promise<void>;
  refreshToken(user: UserModel): AuthModel;
  verifyToken(token: string): boolean;
  forgotPassword(email: string): void;
  resetPassword(
    user: UserModel,
    password: string,
  ): Promise<{ message: string }>;
  changePassword(user: UserModel, newPassword: string): Promise<void>;
  verifyEmail(token: string): Promise<void>;
  resendVerificationEmail(email: string): Promise<void>;
  sendPasswordResetEmail(email: string): Promise<void>;
  sendVerificationEmail(email: string): Promise<void>;
}
