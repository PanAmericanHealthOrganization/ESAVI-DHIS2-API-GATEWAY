# DHIS2 GATEGWAY, MEDDRA, WHODRUGS, EXTENSIONS

## Descripción

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Instalación

### Desarrollo

#### NVM, Versión de node

Instale el versionador de node "NVM", se puede utilizar la guia oficial del siguiente [link](https://github.com/nvm-sh/nvm)

#### Instalación de dependencias

## Variables de entorno

La configuración de la aplicación soporta las siguientes variables de entorno, estas deben ser declaradas a nivel de sistema operativo

[link](./docs/wiky/variables_entorno.md)Variables de entorno

## Requerimientos

Para el despliegue de la solución se requiere instalar un entorno Node de versión 18 en adelante.

## Desarrollo:

el entorno de desarrollo se configura al clonar el repositorio, porsterio Instale las dependecias del proyecto ejecutando el siguiente comando

```
## instalar la versión de node necesaria para el desarrollo, (.nvmrc)
$ nvm use
## instalar dependencias
$ pnpm install
```

## Despliegue

```
# Desarrollo
$ npm run start

# debug
$ npm run start:dev

# producción
$ npm run start:prod
```

## Soporte

La solución a sido enmarcada en el marco de trabajo [NEST.js](https://nestjs.com/), si el objetivo es modificar la solución debe ser basado en la creación de un proyecto en la estructura de NEST.js

## Contactos

- Author - [Rolando Casigña](https://github.com/rolo1410) [:email:](casignarol@paho.org)

## Licencia

Nest is [MIT licensed](LICENSE).
