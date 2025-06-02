import { FastifyRequest, FastifyReply } from 'fastify';
import { ClientService } from '../services/clientService';
import { createClientSchema, updateClientSchema } from '../schemas/clientSchema';

const clientService = new ClientService();

export class ClientController {
  async create(request: FastifyRequest, reply: FastifyReply) {
    try {
      const data = createClientSchema.parse(request.body);
      const client = await clientService.createClient(data);
      return reply.code(201).send({
        success: true,
        message: '🎉 Cliente criado no AnkaFlow!',
        data: client
      });
    } catch (error: any) {
      return reply.code(400).send({ 
        success: false,
        error: error.message 
      });
    }
  }

  async getAll(request: FastifyRequest, reply: FastifyReply) {
    try {
      const clients = await clientService.getAllClients();
      return reply.send({
        success: true,
        data: clients,
        total: clients.length
      });
    } catch (error: any) {
      return reply.code(500).send({ 
        success: false,
        error: error.message 
      });
    }
  }

  async getById(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };
      const client = await clientService.getClientById(Number(id));
      
      if (!client) {
        return reply.code(404).send({ 
          success: false,
          error: 'Cliente não encontrado' 
        });
      }
      
      return reply.send({
        success: true,
        data: client
      });
    } catch (error: any) {
      return reply.code(500).send({ 
        success: false,
        error: error.message 
      });
    }
  }

  async update(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };
      const data = updateClientSchema.parse(request.body);
      
      const client = await clientService.updateClient(Number(id), data);
      return reply.send({
        success: true,
        message: '✨ Cliente atualizado!',
        data: client
      });
    } catch (error: any) {
      return reply.code(400).send({ 
        success: false,
        error: error.message 
      });
    }
  }

  async delete(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };
      await clientService.deleteClient(Number(id));
      return reply.code(204).send();
    } catch (error: any) {
      return reply.code(500).send({ 
        success: false,
        error: error.message 
      });
    }
  }
}