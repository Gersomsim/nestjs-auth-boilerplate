import {
  CreateUserModel,
  UserModel,
} from '../../../user/domain/models/user.model';

export interface AuthRepository {
  login(
    email: string,
    password: string,
  ): Promise<{
    user: UserModel;
    accessToken: string;
  }>;
  register(user: CreateUserModel): Promise<UserModel>;
  logout(user: UserModel): Promise<void>;
  refreshToken(user: UserModel): Promise<UserModel>;
  verifyToken(token: string): Promise<UserModel>;
  forgotPassword(email: string): Promise<void>;
  resetPassword(token: string, password: string): Promise<void>;
  changePassword(user: UserModel, newPassword: string): Promise<void>;
  verifyEmail(token: string): Promise<void>;
  resendVerificationEmail(email: string): Promise<void>;
  sendPasswordResetEmail(email: string): Promise<void>;
  sendVerificationEmail(email: string): Promise<void>;
}
