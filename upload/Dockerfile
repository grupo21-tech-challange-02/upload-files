# Estágio de desenvolvimento
FROM node:22-slim

WORKDIR /app

# Instalar dependências primeiro (aproveita o cache do Docker)
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copiar o restante do código
COPY . .

# Expõe a porta configurada no angular.json
EXPOSE 8081

# Comando para rodar no modo single-spa
CMD ["npm", "run", "serve:single-spa:upload"]
