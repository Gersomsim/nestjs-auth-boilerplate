import type { CreateUserDto, GetUserDto, UpdateUserDto } from '@domain/dto';
import type { OrmInterface } from '../common/orm.interface';

export type IOrmUserRepository = OrmInterface<
  GetUserDto,
  CreateUserDto,
  UpdateUserDto
>;
