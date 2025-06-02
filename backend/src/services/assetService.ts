import { prisma } from './prisma';
import { CreateAssetInput } from '../schemas/assetSchema';

export class AssetService {
  // Ativos brasileiros realistas
  getFixedAssets() {
    return [
      { 
        id: 1, 
        name: 'Magazine Luiza (MGLU3)', 
        value: 12.47, 
        type: 'Ação', 
        risk: 'Alto',
        sector: 'Varejo'
      },
      { 
        id: 2, 
        name: 'Tesouro Selic 2027', 
        value: 10245.75, 
        type: 'Renda Fixa', 
        risk: 'Baixo',
        sector: 'Governo'
      },
      { 
        id: 3, 
        name: 'FII Shopping Iguatemi (IGUATEMI11)', 
        value: 89.30, 
        type: 'FII', 
        risk: 'Médio',
        sector: 'Imobiliário'
      },
      { 
        id: 4, 
        name: 'Bitcoin (BTC)', 
        value: 287450.90, 
        type: 'Crypto', 
        risk: 'Muito Alto',
        sector: 'Digital'
      },
      { 
        id: 5, 
        name: 'CDB Inter 120% CDI', 
        value: 1500.00, 
        type: 'Renda Fixa', 
        risk: 'Baixo',
        sector: 'Bancário'
      },
      { 
        id: 6, 
        name: 'Petrobras (PETR4)', 
        value: 32.85, 
        type: 'Ação', 
        risk: 'Médio',
        sector: 'Energia'
      },
      { 
        id: 7, 
        name: 'IVVB11 (S&P 500)', 
        value: 245.20, 
        type: 'ETF', 
        risk: 'Médio',
        sector: 'Internacional'
      }
    ];
  }

  async createAsset(data: CreateAssetInput) {
    return await prisma.asset.create({
      data,
      include: { client: true }
    });
  }

  async getAssetsByClient(clientId: number) {
    return await prisma.asset.findMany({
      where: { clientId },
      include: { client: true }
    });
  }
}