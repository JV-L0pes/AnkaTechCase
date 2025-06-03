FROM node:20-alpine

# Instalar curl para health check
RUN apk add --no-cache curl

WORKDIR /app

# Copiar package files
COPY package*.json ./

# Instalar dependências (incluindo dev)
RUN npm ci

# Copiar prisma schema primeiro
COPY prisma ./prisma/

# Gerar cliente Prisma
RUN npx prisma generate

# Copiar código fonte
COPY . .

# Build da aplicação
RUN npm run build

# Remover dependências de desenvolvimento para imagem final mais enxuta
RUN npm prune --production

# Expor porta
EXPOSE 3001

# Comando padrão
CMD ["npm", "start"]