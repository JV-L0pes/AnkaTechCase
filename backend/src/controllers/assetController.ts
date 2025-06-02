import { FastifyRequest, FastifyReply } from 'fastify';
import { AssetService } from '../services/assetService';
import { createAssetSchema } from '../schemas/assetSchema';

const assetService = new AssetService();

export class AssetController {
  async getFixedAssets(request: FastifyRequest, reply: FastifyReply) {
    try {
      const assets = assetService.getFixedAssets();
      return reply.send({
        success: true,
        message: '📈 Oportunidades AnkaFlow carregadas!',
        data: assets
      });
    } catch (error: any) {
      return reply.code(500).send({ 
        success: false,
        error: error.message 
      });
    }
  }

  async createAsset(request: FastifyRequest, reply: FastifyReply) {
    try {
      const data = createAssetSchema.parse(request.body);
      const asset = await assetService.createAsset(data);
      return reply.code(201).send({
        success: true,
        message: '💰 Ativo alocado!',
        data: asset
      });
    } catch (error: any) {
      return reply.code(400).send({ 
        success: false,
        error: error.message 
      });
    }
  }

  async getAssetsByClient(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { clientId } = request.params as { clientId: string };
      const assets = await assetService.getAssetsByClient(Number(clientId));
      return reply.send({
        success: true,
        data: assets
      });
    } catch (error: any) {
      return reply.code(500).send({ 
        success: false,
        error: error.message 
      });
    }
  }
}