# TalaTrivia - API

Bienvenido a **TalaTrivia**, una aplicación construida con [NestJS](https://nestjs.com/) que ofrece un sistema robusto para la gestión de trivias.

## Repositorio
    https://github.com/Samubz/talatrivia

## **Requisitos Previos**
Antes de comenzar, asegúrate de tener instalados los siguientes componentes en tu máquina:
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---
## **Cómo Levantar la Aplicación Por `Primera Vez`**
La aplicación está preparada para ejecutarse en un entorno Docker utilizando `docker-compose`. Sigue estos pasos para levantar el servicio por `primera vez`:

1. **Crear .env teniendo como base el archivo .env.example**

1. **Construir los contenedores:**
   ```bash
   BUILD_TARGET=deploy_with_seed docker-compose build
   ```

1. **Levantar los contenedores:**
    ```bash
    BUILD_TARGET=deploy_with_seed docker-compose up
    ```
    Esto iniciará los servicios necesarios incluyendo la base de datos y la aplicación NestJS y  creara una seed inicial


1. **Acceso a la API: Por defecto, la API estará disponible en:**
    ```bash
    http://localhost:3000
    ```
*Cada vez que realices este proceso se ejecutara la seed inicial*
## **Cómo Levantar la Aplicación (DEPLOY)**
La aplicación está preparada para ejecutarse en un entorno Docker utilizando `docker-compose`. Sigue estos pasos para levantar el servicio:

1. **Crear .env teniendo como base el archivo .env.example**

1. **Construir los contenedores:**
   ```bash
   docker-compose build
   ```

1. **Levantar los contenedores:**
    ```bash
    docker-compose up
    ```
    Esto iniciará los servicios necesarios, incluyendo la base de datos y la aplicación NestJS.


1. **Acceso a la API: Por defecto, la API estará disponible en:**
    ```bash
    http://localhost:3000
    ```



## **Documentación de la API**
Toda la documentación necesaria para realizar pruebas está disponible en la carpeta `doc/postman`.
  ```bash
    doc/postman/TalaTrivia.postman_collection.json
  ```
Importa la colleccion en postman y sigue las instrucciones dentro de Postman para ejecutar los endpoints disponibles.



## **Notas Adicionales**
1. La autenticación es obligatoria para interactuar con la mayoría de los endpoints. Consulta la colección Postman para obtener el token de acceso necesario.
1. Si necesitas cambiar configuraciones específicas como variables de entorno, actualiza el archivo .env según tus necesidades.