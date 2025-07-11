import { Inject, Injectable } from '@nestjs/common';
import { AuthModel } from '../models/auth.model';
import { IOrmAuthRepository } from '@domain/repository';
import { OrmAuthRepository } from '@application/repositories/modules/auth/orm-auth.repository';

@Injectable()
export class AuthRepository {
  constructor(
    @Inject(OrmAuthRepository)
    private readonly repository: IOrmAuthRepository,
  ) {}

  async findByEmail(email: string): Promise<AuthModel | null> {
    return await this.repository.findByEmail(email);
  }
}
