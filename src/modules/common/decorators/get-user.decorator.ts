import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    // const request = ctx.switchToHttp().getRequest();
    // const user = request.user;
    // if (!user) {
    //   throw new InternalServerErrorException('User not found');
    // }
    // return data ? user[data] : (user as UserModel);
  },
);
