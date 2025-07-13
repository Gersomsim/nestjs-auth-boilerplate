import { TypeormUserRepository } from '../../databases/typeorm/user/repositories/typeorm-user.repository';

export const UserToken = 'USER_TOKEN';

export const UserTokenProvider = {
  provide: UserToken,
  useClass: TypeormUserRepository,
};
