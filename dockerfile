# Etapa 1: Construir la aplicación
#docker pull 
FROM node:lts-slim AS build

## Instalación de las dependencias de libreoffice
RUN apt-get update && apt-get install -y \
    libreoffice-calc \
    libreoffice-writer \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*
# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia los archivos de configuración de NestJS
COPY nest-cli.json tsconfig.json ./

# Copia el archivo package.json y package-lock.json (si existe)
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copia el resto de la aplicación
COPY . .

# Compila la aplicación NestJS
RUN npm run build

# Etapa 2: Crear la imagen final
FROM node:lts-slim

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia los archivos de la etapa de construcción
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json

# Expone el puerto en el que la aplicación se ejecutará
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["node", "dist/main"]
