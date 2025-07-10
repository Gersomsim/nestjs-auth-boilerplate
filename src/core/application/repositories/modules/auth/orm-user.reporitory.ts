import { CreateUserDto, GetUserDto, UpdateUserDto } from '@domain/dto';
import { UserEntity } from '@domain/entities/modules';
import { IOrmUserRepository } from '@domain/repository';
import { Injectable } from '@nestjs/common';
import { FindManyOptions, DataSource } from 'typeorm';
import { BaseOrmRepository } from '../common/base-orm.repository';

@Injectable()
export class OrmUserRepository
  extends BaseOrmRepository<
    UserEntity,
    GetUserDto,
    CreateUserDto,
    UpdateUserDto
  >
  implements IOrmUserRepository
{
  constructor(dataSource: DataSource) {
    super(UserEntity, dataSource);
  }

  protected toDto(user: UserEntity): GetUserDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }

  override async getAllElements(): Promise<GetUserDto[]> {
    const options: FindManyOptions<UserEntity> = {};
    const users = await this.getEntities(options);
    return users.map((user) => this.toDto(user));
  }

  async findByEmail(email: string): Promise<GetUserDto | null> {
    const user = await this.findOne({ where: { email } });
    return user;
  }
}
