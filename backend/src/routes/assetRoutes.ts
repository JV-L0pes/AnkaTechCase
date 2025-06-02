import { FastifyInstance } from 'fastify';
import { AssetController } from '../controllers/assetController';

const assetController = new AssetController();

export async function assetRoutes(fastify: FastifyInstance) {
  fastify.get('/assets', assetController.getFixedAssets.bind(assetController));
  fastify.post('/assets', assetController.createAsset.bind(assetController));
  fastify.get('/clients/:clientId/assets', assetController.getAssetsByClient.bind(assetController));
}