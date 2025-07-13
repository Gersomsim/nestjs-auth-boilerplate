import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { GetAllUsersQuery, GetUserByIdQuery } from '@application/users/queries';
import { ActiveUserHandler } from '@application/users/services';
import { Auth } from '@infrastructure/http/decorators';
import { ChangePasswordDto } from './dto/change-password.dto';
import {
  ActiveUserCommand,
  ChangeUserPasswordCommand,
} from '@application/users/commands';
import { GetUser } from '../decorators';
import {
  ChangeUserPasswordHandler,
  GetAllUsersHandler,
  GetUserByIdHandler,
} from '@application/users/services';
import { Response } from '../utils/response.util';

@Controller('users')
export class UserController {
  constructor(
    private readonly getUserByIdHandler: GetUserByIdHandler,
    private readonly changeUserPasswordHandler: ChangeUserPasswordHandler,
    private readonly getAllUsersHandler: GetAllUsersHandler,
    private readonly activeUserHandler: ActiveUserHandler,
  ) {}

  @Get('')
  @Auth()
  async getUsers() {
    const query = new GetAllUsersQuery(1, 10);
    const users = await this.getAllUsersHandler.execute(query);
    return Response.success(users);
  }

  @Get(':id')
  @Auth()
  async getUserById(@Param('id', ParseUUIDPipe) id: string) {
    const query = new GetUserByIdQuery(id);
    const user = await this.getUserByIdHandler.execute(query);
    if (!user) throw new NotFoundException('User not found');
    return Response.success(user);
  }

  @Post('change-password')
  @Auth()
  async changePassword(
    @Body() payload: ChangePasswordDto,
    @GetUser('email') email: string,
  ) {
    const command = new ChangeUserPasswordCommand(
      email,
      payload.password,
      payload.newPassword,
    );
    const user = await this.changeUserPasswordHandler.execute(command);
    return Response.success(user, 'Password changed successfully');
  }

  @Patch('active-inactive/:id')
  @Auth()
  async activeInactive(@Param('id', ParseUUIDPipe) id: string) {
    const command = new ActiveUserCommand(id);
    return Response.success(
      await this.activeUserHandler.execute(command),
      'User updated successfully',
    );
  }
}
