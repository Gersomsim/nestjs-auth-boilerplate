// domain/common/exceptions/domain.exception.ts
export abstract class DomainException extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name; // Para que el nombre de la excepción sea el de la clase hija
    Object.setPrototypeOf(this, new.target.prototype); // Restaurar cadena de prototipos
  }
}
