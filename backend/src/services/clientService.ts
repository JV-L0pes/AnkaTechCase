import { prisma } from './prisma';
import { CreateClientInput, UpdateClientInput } from '../schemas/clientSchema';

export class ClientService {
  async createClient(data: CreateClientInput) {
    return await prisma.client.create({
      data,
      include: { assets: true }
    });
  }

  async getAllClients() {
    return await prisma.client.findMany({
      include: { assets: true },
      orderBy: { createdAt: 'desc' }
    });
  }

  async getClientById(id: number) {
    return await prisma.client.findUnique({
      where: { id },
      include: { assets: true }
    });
  }

  async updateClient(id: number, data: UpdateClientInput) {
    return await prisma.client.update({
      where: { id },
      data,
      include: { assets: true }
    });
  }

  async deleteClient(id: number) {
    return await prisma.client.delete({
      where: { id }
    });
  }
}