export interface JwtPayload {
  id: string;
  type: 'access' | 'refresh' | 'forgot-password';
  // TODO: Add more fields here
}
