export class Response {
  static success<T>(
    data: T,
    message: string = 'Request successful',
  ): { message: string; data: T } {
    return { message, data };
  }
}
