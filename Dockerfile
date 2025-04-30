# Imagen base de Node.js
FROM node:18-alpine

# Crear directorio de la app
WORKDIR /var/www/stats-api

# Copia archivos necesarios para la instalación
COPY package*.json ./

# Instala dependencias
RUN npm install

# Copiar el código fuente
COPY . .

# Exponer el puerto de NestJS
EXPOSE 5173

# Comando para iniciar NestJS
CMD ["npm", "run", "dev"]
