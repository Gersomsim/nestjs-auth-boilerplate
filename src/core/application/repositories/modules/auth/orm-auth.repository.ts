import { Injectable } from '@nestjs/common';
import { IOrmAuthRepository } from '@domain/repository';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from '@domain/entities';
import { AuthDto } from '@domain/dto';

@Injectable()
export class OrmAuthRepository
  extends Repository<UserEntity>
  implements IOrmAuthRepository
{
  constructor(datasource: DataSource) {
    super(UserEntity, datasource.createEntityManager());
  }

  async findByEmail(email: string): Promise<AuthDto | null> {
    const user = await this.findOneBy({ email });
    if (!user) return null;
    return user;
  }
}
