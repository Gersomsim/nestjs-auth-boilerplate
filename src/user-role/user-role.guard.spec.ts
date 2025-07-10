import { UserRoleGuard } from '../modules/common/guard/user-role.guard';

describe('UserRoleGuard', () => {
  it('should be defined', () => {
    expect(new UserRoleGuard()).toBeDefined();
  });
});
