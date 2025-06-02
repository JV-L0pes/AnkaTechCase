# AnkaFlow Frontend Dockerfile
FROM node:18-alpine

LABEL maintainer="Anka Tech <contato@ankatech.com.br>"
LABEL description="AnkaFlow Frontend"
LABEL version="1.0.0"

WORKDIR /app

# Instalar dependências
COPY package*.json ./
RUN npm ci && npm cache clean --force

# Copiar código
COPY . .

# Build para produção
RUN npm run build

# Expor porta
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000 || exit 1

# Iniciar aplicação
CMD ["npm", "start"]