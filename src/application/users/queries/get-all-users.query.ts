export class GetAllUsersQuery {
  constructor(
    public readonly page: number,
    public readonly limit: number,
  ) {}
}
