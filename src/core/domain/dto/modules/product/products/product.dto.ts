export interface CreateProductDto {
  name: string;
  description: string;
  price: number;
  stock: number;
}

export interface GetProductDto {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateProductDto {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
}
