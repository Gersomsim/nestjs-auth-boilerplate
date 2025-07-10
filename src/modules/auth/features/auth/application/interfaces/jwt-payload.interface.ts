export interface JwtPayload {
  id: string;
  type: 'access' | 'refresh';
  // TODO: Add more fields here
}
