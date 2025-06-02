# AnkaFlow 
*Investment Management Platform*

Sistema de gestão de carteiras de investimento desenvolvido para o processo seletivo da Anka Tech.

## 🚀 Tecnologias

- **Backend**: Node.js, Fastify, Prisma, MySQL, TypeScript
- **Frontend**: Next.js, ShadCN UI, React Query, TypeScript
- **Containerização**: Docker Compose

## ⚡ Execução Rápida

```bash
1. Banco
docker-compose up db -d

# 2. Backend
cd backend
npm install
npx prisma db push
npm run dev

# 3. Frontend
cd frontend  
npm install
npm run dev
