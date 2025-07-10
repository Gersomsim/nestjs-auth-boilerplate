import type { CreateUserDto, GetUserDto, UpdateUserDto } from '@domain/dto';
import type { OrmInterface } from '../../common/orm.interface';

export interface IOrmUserRepository
  extends OrmInterface<GetUserDto, CreateUserDto, UpdateUserDto> {
  findByEmail(email: string): Promise<GetUserDto | null>;
}
