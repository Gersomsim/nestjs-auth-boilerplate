import { DomainException } from './domain.exception';

export class UserInactiveException extends DomainException {
  constructor() {
    super('User is not active, contact support to activate your account');
  }
}
