import { Controller, Inject } from '@nestjs/common';
import type { UserUseCaseInterface } from '../application/user.use-case.interface';
import { UserUseCaseService } from '../application/user.use-case.service';

@Controller('user')
export class UserController {
  constructor(
    @Inject(UserUseCaseService)
    private readonly userUseCase: UserUseCaseInterface,
  ) {}
}
