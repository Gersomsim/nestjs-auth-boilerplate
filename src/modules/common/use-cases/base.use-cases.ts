import type { BaseUseCaseInterface } from './base-use-case.interface';

export abstract class BaseUseCases<T> implements BaseUseCaseInterface<T> {
  getAll(): Promise<T[]> {
    throw new Error('Method not implemented.');
  }
  getById(id: string): Promise<T> {
    throw new Error('Method not implemented.');
  }
  create(data: T): Promise<T> {
    throw new Error('Method not implemented.');
  }
  update(id: string, data: T): Promise<T> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<T> {
    throw new Error('Method not implemented.');
  }
}
