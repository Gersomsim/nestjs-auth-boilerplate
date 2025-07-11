import { AuthModel } from '../models/auth.model';

export interface IAuthRepository {
  findByEmail(email: string): Promise<AuthModel | null>;
}
