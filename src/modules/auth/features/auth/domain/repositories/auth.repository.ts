import {
  CreateUserModel,
  UserModel,
} from '../../../user/domain/models/user.model';
import { ChangePasswordDto } from '../../infrastructure/dto/change-password.dto';
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
  changePassword(
    user: UserModel,
    changePasswordDto: ChangePasswordDto,
  ): Promise<{ message: string }>;
  verifyEmail(token: string): Promise<void>;
  resendVerificationEmail(email: string): Promise<void>;
  sendPasswordResetEmail(email: string): Promise<void>;
  sendVerificationEmail(email: string): Promise<void>;
}
