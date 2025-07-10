import { UserModel } from '../../../user/domain/models/user.model';

export class AuthModel {
  user: UserModel;
  accessToken: string;
  refreshToken: string;
}
