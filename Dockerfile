# Usa la imagen oficial de Node.js
FROM node:20

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos del proyecto al directorio de trabajo
COPY . .

# Construye la aplicación para producción
RUN npm run build

# Expone el puerto en el que la aplicación correrá
EXPOSE 3015

# Comando para iniciar la aplicación en producción
CMD ["npm", "run", "preview", "--", "--port", "3015"]
