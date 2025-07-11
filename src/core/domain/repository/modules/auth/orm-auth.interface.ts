import { AuthDto } from '@domain/dto';

export interface IOrmAuthRepository {
  findByEmail(email: string): Promise<AuthDto | null>;
}
