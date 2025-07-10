# BaseOrmRepository - Abstracción para Repositorios CRUD

## Descripción

La clase `BaseOrmRepository` es una abstracción que proporciona toda la funcionalidad CRUD básica para cualquier entidad. Esto elimina la necesidad de escribir código repetitivo para cada repositorio.

## Características

- ✅ Operaciones CRUD completas (Create, Read, Update, Delete)
- ✅ Manejo automático de errores (NotFoundException)
- ✅ Conversión automática de entidades a DTOs
- ✅ Tipado fuerte con TypeScript
- ✅ Compatible con TypeORM

## Cómo usar

### 1. Definir los DTOs

```typescript
// product.dto.ts
export interface CreateProductDto {
  name: string;
  price: number;
}

export interface GetProductDto {
  id: string;
  name: string;
  price: number;
}

export interface UpdateProductDto {
  name?: string;
  price?: number;
}
```

### 2. Crear la entidad

```typescript
// product.entity.ts
@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;
}
```

### 3. Definir la interfaz del repositorio

```typescript
// orm-product.interface.ts
import type { OrmInterface } from '../../common/orm.interface';

export type IOrmProductRepository = OrmInterface<
  GetProductDto,
  CreateProductDto,
  UpdateProductDto
>;
```

### 4. Implementar el repositorio

```typescript
// orm-product.repository.ts
@Injectable()
export class OrmProductRepository
  extends BaseOrmRepository<
    ProductEntity,
    GetProductDto,
    CreateProductDto,
    UpdateProductDto
  >
  implements IOrmProductRepository
{
  constructor(dataSource: DataSource) {
    super(ProductEntity, dataSource);
  }

  protected toDto(product: ProductEntity): GetProductDto {
    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
```

## Métodos disponibles

### getAllElements(): Promise<TGetDto[]>

Obtiene todos los elementos de la entidad.

### getElementById(id: string): Promise<TGetDto>

Obtiene un elemento por su ID. Lanza `NotFoundException` si no existe.

### newElement(data: TCreateDto): Promise<TGetDto>

Crea un nuevo elemento.

### updateElementById(id: string, data: TUpdateDto): Promise<TGetDto>

Actualiza un elemento por su ID. Lanza `NotFoundException` si no existe.

### deleteElementById(id: string): Promise<TGetDto>

Elimina un elemento por su ID. Lanza `NotFoundException` si no existe.

## Ventajas

1. **Menos código repetitivo**: Solo necesitas implementar el método `toDto`
2. **Consistencia**: Todos los repositorios tienen la misma interfaz
3. **Mantenibilidad**: Cambios en la lógica base se aplican a todos los repositorios
4. **Tipado fuerte**: TypeScript garantiza la consistencia de tipos
5. **Fácil testing**: La lógica base es fácil de probar

## Ejemplo completo

```typescript
// Antes (código repetitivo)
export class OrmUserRepository extends Repository<UserEntity> {
  async getAllElements(): Promise<GetUserDto[]> {
    const users = await this.find();
    return users.map((user) => this.toDto(user));
  }

  async getElementById(id: string): Promise<GetUserDto> {
    const user = await this.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return this.toDto(user);
  }
  // ... más métodos repetitivos
}

// Después (usando abstracción)
export class OrmUserRepository extends BaseOrmRepository<
  UserEntity,
  GetUserDto,
  CreateUserDto,
  UpdateUserDto
> {
  constructor(dataSource: DataSource) {
    super(UserEntity, dataSource);
  }

  protected toDto(user: UserEntity): GetUserDto {
    return { id: user.id, name: user.name, email: user.email };
  }
}
```

¡Eso es todo! Ahora tienes un repositorio CRUD completo con solo implementar el método `toDto`.
