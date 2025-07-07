import { CreateUserDto, GetUserDto, UpdateUserDto } from '@domain/dto';
import { OrmInterface } from '../../common/orm.interface';

export type IOrmUserRepository = OrmInterface<
  GetUserDto,
  CreateUserDto,
  UpdateUserDto
>;
