import { BaseRepositoryInterface } from './base-repository.interface';

export abstract class BaseRepository<T> implements BaseRepositoryInterface<T> {
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
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
