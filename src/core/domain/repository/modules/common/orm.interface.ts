export interface OrmInterface<T, C, U> {
  getAllElements(): Promise<T[]>;
  getElementById(id: string): Promise<T>;
  newElement(data: C): Promise<T>;
  updateElementById(id: string, data: U): Promise<T>;
  deleteElementById(id: string): Promise<T>;
}
