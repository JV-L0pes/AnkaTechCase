import { FastifyInstance } from 'fastify';
import { ClientController } from '../controllers/clientController';

const clientController = new ClientController();

export async function clientRoutes(fastify: FastifyInstance) {
  fastify.post('/clients', clientController.create.bind(clientController));
  fastify.get('/clients', clientController.getAll.bind(clientController));
  fastify.get('/clients/:id', clientController.getById.bind(clientController));
  fastify.put('/clients/:id', clientController.update.bind(clientController));
  fastify.delete('/clients/:id', clientController.delete.bind(clientController));
}