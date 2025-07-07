import { Injectable, NotFoundException } from '@nestjs/common';

import { UserEntity } from '@domain/entities/modules';
import { DataSource, Repository } from 'typeorm';
import { IOrmUserRepository } from '@domain/repository';
import { CreateUserDto, GetUserDto, UpdateUserDto } from '@domain/dto';

@Injectable()
export class OrmUserRepository
  extends Repository<UserEntity>
  implements IOrmUserRepository
{
  constructor(dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  private toDto(user: UserEntity): GetUserDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }

  async getAllElements(): Promise<GetUserDto[]> {
    const users: UserEntity[] = await this.find();
    return users.map((user) => this.toDto(user));
  }
  async getElementById(id: string): Promise<GetUserDto> {
    const user = await this.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.toDto(user);
  }
  async newElement(data: CreateUserDto): Promise<GetUserDto> {
    const user = this.create(data);
    await this.save(user);
    return this.toDto(user);
  }
  async updateElementById(
    id: string,
    data: UpdateUserDto,
  ): Promise<GetUserDto> {
    const user = await this.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.update(id, data);
    return this.toDto(user);
  }
  async deleteElementById(id: string): Promise<GetUserDto> {
    const user = await this.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.remove(user);
    return this.toDto(user);
  }
}
