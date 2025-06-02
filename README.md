# AnkaFlow 
*Investment Management Platform*

Sistema de gestão de carteiras de investimento desenvolvido para o processo seletivo da Anka Tech.

## 🚀 Tecnologias

- **Backend**: Node.js, Fastify, Prisma, MySQL, TypeScript
- **Frontend**: Next.js, ShadCN UI, React Query, TypeScript
- **Containerização**: Docker Compose

# AnkaFlow - Execução Rápida

## 🚀 Execução com Docker (Recomendado)

```bash
git clone https://github.com/[usuario]/ankaflow.git
cd ankaflow
docker-compose up --build
Aguarde 2-3 minutos para inicialização completa.
Acesse: http://localhost:3000
🔧 Execução Manual (Desenvolvimento)
Pré-requisitos

Node.js 18+
Docker (apenas para MySQL)

Passos
bash# 1. Banco
docker-compose up db -d

# 2. Backend
cd backend
npm install
cp .env.example .env
npx prisma generate
npx prisma db push
npm run dev

# 3. Frontend
cd frontend
npm install
cp .env.example .env.local
npm run dev
URLs

Frontend: http://localhost:3000
Backend: http://localhost:3001
Health: http://localhost:3001/health

Troubleshooting
Se der erro:
bashdocker-compose down -v
docker-compose up --build

---

## Principais Melhorias

1. **Health Checks**: Garante que serviços iniciem na ordem correta
2. **Comandos automáticos**: Backend roda prisma generate e db push automaticamente
3. **Aguarda dependências**: Frontend só inicia após backend estar pronto
4. **Builds otimizados**: Dockerfiles para produção
5. **Restart policies**: Containers reiniciam automaticamente se falharem
6. **Scripts corretos**: package.json com comandos de build e start

Com essas correções, `docker-compose up --build` vai funcionar automaticamente!
