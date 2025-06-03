FROM node:18-alpine

WORKDIR /app

# Copiar package files
COPY package*.json ./

# Instalar dependências
RUN npm ci

# Copiar código fonte
COPY . .

# Ignorar erros de TypeScript no build (temporário)
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Build com tratamento de erro
RUN npm run build || npm run build -- --debug

# Expor porta
EXPOSE 3000

# Comando padrão
CMD ["npm", "start"]
