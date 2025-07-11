import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/users/entities/user.entity';
import { IUserRepository } from 'src/domain/users/interfaces/user.repository.interface';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class TypeormUserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}
  async findByEmail(
    email: string,
  ): Promise<{ user: User; passwordHash: string } | null> {
    const userEntity = await this.repository.findOneBy({ email });
    if (!userEntity) return null;
    return {
      user: this.toDomain(userEntity),
      passwordHash: userEntity.password,
    };
  }
  async createElement(user: User, rawPassword: string): Promise<User> {
    const passwordHash = await bcrypt.hash(rawPassword, 10);
    const userEntity = this.repository.create({
      id: user.Id,
      name: user.Name,
      email: user.Email,
      password: passwordHash,
    });
    const savedUser = await this.repository.save(userEntity);
    return this.toDomain(savedUser);
  }
  async findById(id: string): Promise<User | null> {
    const userEntity = await this.repository.findOneBy({ id });
    if (!userEntity) return null;
    return this.toDomain(userEntity);
  }
  async findAll(): Promise<User[]> {
    const userEntities = await this.repository.find();
    return userEntities.map((userEntity) => this.toDomain(userEntity));
  }
  async updateElement(user: User): Promise<User> {
    const userEntity = await this.repository.findOneBy({ id: user.Id });
    if (!userEntity) throw new NotFoundException('User not found');
    userEntity.name = user.Name;
    userEntity.email = user.Email;
    userEntity.isVerified = user.IsVerified;
    userEntity.isActive = user.IsActive;
    userEntity.verifiedAt = user.VerifiedAt ?? null;
    const savedUser = await this.repository.save(userEntity);
    return this.toDomain(savedUser);
  }
  async deleteElement(id: string): Promise<User> {
    const userEntity = await this.repository.findOneBy({ id });
    if (!userEntity) throw new NotFoundException('User not found');
    await this.repository.remove(userEntity);
    return this.toDomain(userEntity);
  }

  private toDomain(userEntity: UserEntity): User {
    return new User(
      userEntity.id,
      userEntity.name,
      userEntity.email,
      userEntity.isVerified,
      userEntity.isActive,
      userEntity.verifiedAt ?? undefined,
    );
  }
}
