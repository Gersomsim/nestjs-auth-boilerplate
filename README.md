# NestJS Auth Boilerplate

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

<p align="center">Un boilerplate completo de <a href="http://nodejs.org" target="_blank">NestJS</a> con sistema de autenticación JWT, gestión de usuarios y envío de emails.</p>

## 🚀 Características

- ✅ **Autenticación JWT** - Login, registro y refresh tokens
- ✅ **Gestión de usuarios** - CRUD completo con validaciones
- ✅ **Envío de emails** - Verificación de email y recuperación de contraseña
- ✅ **Arquitectura limpia** - Domain-Driven Design con CQRS
- ✅ **Base de datos** - TypeORM con PostgreSQL
- ✅ **Validaciones** - Class-validator y class-transformer
- ✅ **Documentación API** - Swagger/OpenAPI integrado
- ✅ **Rate limiting** - Protección contra ataques de fuerza bruta
- ✅ **Manejo de errores** - Filtros globales de excepciones
- ✅ **Testing** - Configuración completa para tests unitarios y e2e

## 📋 Prerrequisitos

- Node.js (v18 o superior)
- PostgreSQL
- Docker (opcional)

## 🛠️ Instalación

### Opción 1: Instalación local

```bash
# Clonar el repositorio
git clone https://github.com/Gersomsim/nestjs-auth-boilerplate.git
cd nestjs-auth-boilerplate

# Instalar dependencias
npm install

# Configurar variables de entorno
cp env.example .env
```

### Opción 2: Instalación con Docker (Recomendado)

```bash
# Clonar el repositorio
git clone https://github.com/Gersomsim/nestjs-auth-boilerplate.git
cd nestjs-auth-boilerplate

# Configurar variables de entorno
cp env.example .env

# Ejecutar con Docker Compose
docker-compose up -d
```

## ⚙️ Configuración

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
# Base de datos
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_DATABASE=nestjs_auth

# JWT
JWT_SECRET=tu-jwt-secret-super-seguro
JWT_REFRESH_SECRET=tu-jwt-refresh-secret-super-seguro
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Email
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=tu-email@gmail.com
MAIL_PASS=tu-password-de-aplicacion
MAIL_FROM=tu-email@gmail.com

# App
APP_URL=http://localhost:3000
```

## 🚀 Ejecución

```bash
# Desarrollo
npm run start:dev

# Producción
npm run build
npm run start:prod

# Debug
npm run start:debug
```

## 🧪 Testing

```bash
# Tests unitarios
npm run test

# Tests e2e
npm run test:e2e

# Cobertura de tests
npm run test:cov

# Tests en modo watch
npm run test:watch
```

## 📚 Estructura del Proyecto

```
src/
├── application/          # Casos de uso (CQRS)
│   ├── auth/           # Comandos y queries de autenticación
│   └── users/          # Comandos y queries de usuarios
├── domain/             # Entidades y reglas de negocio
│   ├── auth/          # Interfaces de autenticación
│   ├── users/         # Entidades y repositorios de usuarios
│   └── common/        # Excepciones y interfaces comunes
├── infrastructure/     # Implementaciones técnicas
│   ├── databases/     # Repositorios y entidades de BD
│   ├── http/          # Controladores, DTOs y módulos
│   ├── auth/          # Estrategias JWT y adaptadores
│   └── mails/         # Servicio de emails
└── config/            # Configuraciones de la aplicación
```

## 🐳 Docker

### Ejecutar con Docker Compose (Recomendado)

```bash
# Clonar el repositorio
git clone https://github.com/Gersomsim/nestjs-auth-boilerplate.git
cd nestjs-auth-boilerplate

# Copiar archivo de variables de entorno
cp env.example .env

# Editar variables de entorno (opcional)
nano .env

# Ejecutar con docker-compose
docker-compose up -d

# Ver logs
docker-compose logs -f app

# Detener servicios
docker-compose down
```

### Construir imagen manualmente

```bash
# Construir imagen
docker build -t nestjs-auth-boilerplate .

# Ejecutar contenedor
docker run -d \
  --name nestjs-auth-app \
  -p 3000:3000 \
  --env-file .env \
  nestjs-auth-boilerplate
```

### Variables de entorno para Docker

Asegúrate de configurar las siguientes variables en tu archivo `.env`:

```env
# Base de datos
DB_HOST=postgres
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_DATABASE=nestjs_auth

# JWT
JWT_SECRET=tu-jwt-secret-super-seguro
JWT_REFRESH_SECRET=tu-jwt-refresh-secret-super-seguro

# Email
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=tu-email@gmail.com
MAIL_PASS=tu-password-de-aplicacion
MAIL_FROM=tu-email@gmail.com
```

### Servicios incluidos

- **app**: Aplicación NestJS (puerto 3000)
- **postgres**: Base de datos PostgreSQL (puerto 5432)
- **redis**: Cache Redis (puerto 6379) - opcional

## 📖 Documentación API

Una vez que la aplicación esté ejecutándose, puedes acceder a la documentación Swagger en:

```
http://localhost:3000/api
```

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run start:dev      # Ejecutar en modo desarrollo
npm run start:debug    # Ejecutar en modo debug

# Producción
npm run build          # Compilar el proyecto
npm run start:prod     # Ejecutar en modo producción

# Testing
npm run test           # Ejecutar tests unitarios
npm run test:e2e       # Ejecutar tests e2e
npm run test:cov       # Ejecutar tests con cobertura

# Linting y formateo
npm run lint           # Ejecutar ESLint
npm run format         # Formatear código con Prettier
```

## 🏗️ Arquitectura

Este boilerplate sigue los principios de **Clean Architecture** y **Domain-Driven Design**:

- **Domain Layer**: Contiene las entidades, interfaces y reglas de negocio
- **Application Layer**: Implementa los casos de uso usando CQRS
- **Infrastructure Layer**: Maneja la persistencia, HTTP y servicios externos

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m '✨Feat: add amazing feature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🆘 Soporte

Si tienes alguna pregunta o necesitas ayuda, puedes:

- Abrir un issue en el repositorio
- Contactar al equipo de desarrollo
- Revisar la documentación de NestJS en [docs.nestjs.com](https://docs.nestjs.com)

---

**¡Disfruta construyendo tu aplicación con este boilerplate! 🚀**
