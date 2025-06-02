'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useClients } from '@/hooks/useClients';
import { useFixedAssets, useCreateAsset, useClientAssets } from '@/hooks/useAssets';
import { Plus, Wallet } from 'lucide-react';

const allocationSchema = z.object({
  clientId: z.string().min(1, 'Cliente é obrigatório'),
  assetName: z.string().min(1, 'Ativo é obrigatório'),
  value: z.string().min(1, 'Valor é obrigatório'),
});

type AllocationFormData = z.infer<typeof allocationSchema>;

export function AssetAllocation() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
  
  const { data: clients } = useClients();
  const { data: fixedAssets } = useFixedAssets();
  const { data: clientAssets } = useClientAssets(selectedClientId || 0);
  const createAsset = useCreateAsset();

  const { register, handleSubmit, formState: { errors }, setValue, watch, reset } = useForm<AllocationFormData>({
    resolver: zodResolver(allocationSchema),
  });

  const selectedAssetName = watch('assetName');
  const selectedAsset = fixedAssets?.find(asset => asset.name === selectedAssetName);

  const onSubmit = async (data: AllocationFormData) => {
    try {
      await createAsset.mutateAsync({
        name: data.assetName,
        value: parseFloat(data.value),
        clientId: parseInt(data.clientId),
      });
      setIsDialogOpen(false);
      reset();
    } catch (error) {
      console.error('Erro ao alocar ativo:', error);
    }
  };

  const handleAssetChange = (assetName: string) => {
    setValue('assetName', assetName);
    const asset = fixedAssets?.find(a => a.name === assetName);
    if (asset) {
      setValue('value', asset.value.toString());
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Wallet className="h-8 w-8 text-orange-600" />
            Carteiras de Investimento
          </h2>
          <p className="text-gray-600">Aloque ativos para seus clientes de forma inteligente</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-orange-500 hover:bg-orange-600">
              <Plus className="h-4 w-4 mr-2" />
              Nova Alocação
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Alocar Ativo na Carteira</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="clientId">Investidor</Label>
                <Select onValueChange={(value) => setValue('clientId', value)}>
                  <SelectTrigger className="border-orange-200">
                    <SelectValue placeholder="Selecione um cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    {clients?.map((client) => (
                      <SelectItem key={client.id} value={client.id.toString()}>
                        {client.name} ({client.status ? 'Ativo' : 'Inativo'})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.clientId && (
                  <p className="text-sm text-red-500 mt-1">{errors.clientId.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="assetName">Oportunidade de Investimento</Label>
                <Select onValueChange={handleAssetChange}>
                  <SelectTrigger className="border-orange-200">
                    <SelectValue placeholder="Selecione uma oportunidade" />
                  </SelectTrigger>
                  <SelectContent>
                    {fixedAssets?.map((asset) => (
                      <SelectItem key={asset.id} value={asset.name}>
                        {asset.name} - R$ {asset.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.assetName && (
                  <p className="text-sm text-red-500 mt-1">{errors.assetName.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="value">Valor do Investimento</Label>
                <Input
                  id="value"
                  type="number"
                  step="0.01"
                  {...register('value')}
                  placeholder="Digite o valor a investir"
                  className="border-orange-200 focus:border-orange-400"
                />
                {selectedAsset && (
                  <p className="text-sm text-orange-600 mt-1">
                    Cotação de referência: R$ {selectedAsset.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                )}
                {errors.value && (
                  <p className="text-sm text-red-500 mt-1">{errors.value.message}</p>
                )}
              </div>

              <Button 
                type="submit" 
                disabled={createAsset.isPending} 
                className="w-full bg-orange-500 hover:bg-orange-600"
              >
                {createAsset.isPending ? 'Alocando...' : 'Alocar na Carteira'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        <Card className="border-orange-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Visualizar Carteiras por Cliente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Select onValueChange={(value) => setSelectedClientId(parseInt(value))}>
                <SelectTrigger className="border-orange-200">
                  <SelectValue placeholder="Selecione um cliente para visualizar a carteira" />
                </SelectTrigger>
                <SelectContent>
                  {clients?.map((client) => (
                    <SelectItem key={client.id} value={client.id.toString()}>
                      {client.name} ({client.status ? 'Ativo' : 'Inativo'})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {selectedClientId && clientAssets && (
                <div className="space-y-4">
                  <h4 className="font-medium flex items-center gap-2">
                    Carteira de Investimentos:
                  </h4>
                  {clientAssets.length > 0 ? (
                    <div className="space-y-3">
                      {clientAssets.map((asset) => (
                        <div key={asset.id} className="flex justify-between items-center p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg border border-orange-100">
                          <div>
                            <span className="font-medium text-orange-900">{asset.name}</span>
                            <p className="text-sm text-orange-600">
                              Alocado em: {new Date(asset.createdAt!).toLocaleDateString('pt-BR')}
                            </p>
                          </div>
                          <span className="font-bold text-green-600 text-lg">
                            R$ {asset.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                      ))}
                      <div className="border-t border-orange-200 pt-4">
                        <div className="flex justify-between items-center font-bold bg-green-50 p-4 rounded-lg border border-green-200">
                          <span className="flex items-center gap-2">
                            Total Investido:
                          </span>
                          <span className="text-green-600 text-xl">
                            R$ {clientAssets.reduce((sum, asset) => sum + asset.value, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">Nenhum ativo alocado para este cliente ainda</p>
                      <p className="text-sm text-gray-400">Use o botão &quot;Nova Alocação&quot; para começar</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}