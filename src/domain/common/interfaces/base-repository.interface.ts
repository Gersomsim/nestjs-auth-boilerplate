export abstract class IBaseRepository<T> {
  abstract createElement(entity: T): Promise<T>;
  abstract findById(id: string): Promise<T | null>;
  abstract findAll(): Promise<T[]>;
  abstract updateElement(entity: T): Promise<T>;
  abstract deleteElement(id: string): Promise<T>;
}
