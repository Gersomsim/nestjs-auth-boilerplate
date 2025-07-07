import { UserEntity } from '@domain/entities/modules';
import { GetUserDto } from '@domain/dto';

export abstract class UserMapper {
  static toDto(user: UserEntity): GetUserDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
