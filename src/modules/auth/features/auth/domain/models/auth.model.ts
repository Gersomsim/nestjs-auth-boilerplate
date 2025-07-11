import { UserModel } from '../../../user/domain/models/user.model';

export class AuthModel extends UserModel {
  password: string;
}
