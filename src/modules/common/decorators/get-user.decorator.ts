import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserModel } from 'src/modules/auth/features/user/domain/models/user.model';

export const GetUser = createParamDecorator(
  (data: any, ctx: ExecutionContext): UserModel | string | undefined => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    if (!user) {
      throw new InternalServerErrorException('User not found');
    }
    return data ? user[data] : (user as UserModel);
  },
);
