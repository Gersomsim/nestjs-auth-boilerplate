import { DomainException } from '@domain/common/exceptions/domain.exception';

export class InvalidTokenException extends DomainException {
  constructor(message: string = 'Invalid token, please login again') {
    super(message);
  }
}
