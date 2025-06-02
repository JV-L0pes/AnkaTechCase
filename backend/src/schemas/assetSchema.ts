import { z } from 'zod';

export const createAssetSchema = z.object({
  name: z.string().min(1, 'Nome do ativo é obrigatório'),
  value: z.number().positive('Valor deve ser positivo'),
  clientId: z.number().int().positive('ID do cliente inválido')
});

export type CreateAssetInput = z.infer<typeof createAssetSchema>;