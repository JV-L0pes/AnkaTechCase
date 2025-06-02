import Fastify from 'fastify';
import cors from '@fastify/cors';
import { clientRoutes } from './routes/clientRoutes';
import { assetRoutes } from './routes/assetRoutes';

const fastify = Fastify({
  logger: true
});

// CORS
fastify.register(cors, {
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE']
});

// Rotas
fastify.register(clientRoutes, { prefix: '/api' });
fastify.register(assetRoutes, { prefix: '/api' });

// Health check AnkaFlow
fastify.get('/health', async (request, reply) => {
  return { 
    status: 'AnkaFlow funcionando! 🚀', 
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    brand: 'Powered by Anka Tech 💜'
  };
});

// Rota raiz
fastify.get('/', async (request, reply) => {
  return {
    message: '💜 Bem-vindo ao AnkaFlow API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      clients: '/api/clients',
      assets: '/api/assets'
    }
  };
});

const start = async () => {
  try {
    const port = Number(process.env.PORT) || 3001;
    await fastify.listen({ port, host: '0.0.0.0' });
    
    console.log(`🚀 AnkaFlow Backend na porta ${port}`);
    console.log(`💜 Powered by Anka Tech`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();