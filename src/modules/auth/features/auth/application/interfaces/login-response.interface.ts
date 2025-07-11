import { UserModel } from '../../../user/domain/models/user.model';

export interface LoginResponse {
  user: UserModel;
  accessToken: string;
  refreshToken: string;
}
