FROM node:18-alpine

# Instalar curl para health check
RUN apk add --no-cache curl

WORKDIR /app

# Copiar package files
COPY package*.json ./

# Instalar dependências
RUN npm ci --only=production

# Copiar prisma schema primeiro
COPY prisma ./prisma/

# Gerar cliente Prisma
RUN npx prisma generate

# Copiar código fonte
COPY . .

# Build da aplicação
RUN npm run build

# Expor porta
EXPOSE 3001

# Comando padrão
CMD ["npm", "start"]