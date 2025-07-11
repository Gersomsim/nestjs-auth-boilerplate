import { TypeormUserRepository } from '../../databases/typeorm/user/repositories/typeorm-user.repository';

export const UserToken = 'USER_TOKEN';

export const UserDI = {
  provide: UserToken,
  useClass: TypeormUserRepository,
};
