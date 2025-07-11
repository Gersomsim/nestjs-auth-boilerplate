import { User } from '../entities/user.entity';

export interface IUserRepository {
  findByEmail(
    email: string,
  ): Promise<{ user: User; passwordHash: string } | null>;
  createElement(user: User, rawPassword: string): Promise<User>;
  findById(id: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  updateElement(user: User): Promise<User>;
  deleteElement(id: string): Promise<User>;
}
