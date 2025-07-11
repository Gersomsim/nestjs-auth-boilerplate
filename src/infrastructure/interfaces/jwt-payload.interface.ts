export interface JwtPayload {
  id: string;
  type: 'access' | 'forgot-password' | 'refresh-token';
}
