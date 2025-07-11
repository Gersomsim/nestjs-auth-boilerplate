import { GetUserDto } from './user.dto';

export class AuthDto extends GetUserDto {
  password: string;
}
