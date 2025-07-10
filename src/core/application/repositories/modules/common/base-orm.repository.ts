import { OrmInterface } from '@domain/repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import {
  type DataSource,
  Repository,
  EntityTarget,
  ObjectLiteral,
  DeepPartial,
  FindOptionsWhere,
  FindManyOptions,
} from 'typeorm';

@Injectable()
export abstract class BaseOrmRepository<
    TEntity extends ObjectLiteral,
    TGetDto,
    TCreateDto,
    TUpdateDto,
  >
  extends Repository<TEntity>
  implements OrmInterface<TGetDto, TCreateDto, TUpdateDto>
{
  constructor(entity: EntityTarget<TEntity>, dataSource: DataSource) {
    super(entity, dataSource.createEntityManager());
  }

  protected abstract toDto(entity: TEntity): TGetDto;

  abstract getAllElements(): Promise<TGetDto[]>;

  getEntities(options?: FindManyOptions<TEntity>): Promise<TEntity[]> {
    return this.find(options);
  }

  async getElementById(id: string): Promise<TGetDto> {
    const entity = await this.getEntity(id);
    return this.toDto(entity);
  }

  async newElement(data: TCreateDto): Promise<TGetDto> {
    const entity = this.create(data as DeepPartial<TEntity>);
    const savedEntity = await this.save(entity);
    return this.toDto(savedEntity);
  }

  async updateElementById(id: string, data: TUpdateDto): Promise<TGetDto> {
    const entity = await this.getEntity(id);
    const mergedEntity = this.merge(entity, data as DeepPartial<TEntity>);
    const updatedEntity = await this.save(mergedEntity);
    return this.toDto(updatedEntity);
  }

  async deleteElementById(id: string): Promise<TGetDto> {
    const entity = await this.getEntity(id);
    await this.remove(entity);
    return this.toDto(entity);
  }

  /**
   * Método auxiliar para obtener el nombre de la entidad para mensajes de error
   */
  private getEntityName(): string {
    return this.constructor.name.replace('Repository', '').replace('Orm', '');
  }

  private async getEntity(id: string): Promise<TEntity> {
    const entity = await this.findOne({
      where: { id } as unknown as FindOptionsWhere<TEntity>,
    });
    if (!entity) {
      throw new NotFoundException(`${this.getEntityName()} not found`);
    }
    return entity;
  }
}
