# Etapa 1: build (opcional si tienes TS o Babel; omitida aquí)
# Etapa final: imagen de producción
FROM node:18

WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar solo dependencias de producción
RUN npm install --omit=dev

# Copiar todo el código
COPY . .

# Exponer puerto
EXPOSE 3001

# Comando para iniciar
CMD ["node", "src/index.js"]
