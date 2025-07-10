import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UserModel } from 'src/modules/auth/features/user/domain/models/user.model';
import { META_ROLES } from '../decorators/role-protected.decorator';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const validRoles = this.reflector.get(META_ROLES, context.getHandler());
    const req = context.switchToHttp().getRequest();
    const user = req.user as UserModel;
    console.log(validRoles);
    console.log(user);
    return true;
  }
}
