'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useFixedAssets } from '@/hooks/useAssets';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export function AssetList() {
  const { data: assets, isLoading, error } = useFixedAssets();

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-full"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Erro ao carregar ativos</p>
      </div>
    );
  }

  const getRiskVariant = (risk: string) => {
    switch (risk) {
      case 'Baixo': return 'default';
      case 'Médio': return 'secondary';
      case 'Alto': return 'destructive';
      case 'Muito Alto': return 'destructive';
      default: return 'secondary';
    }
  };

  const getTrendIcon = (type: string) => {
    if (type === 'Ação') return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (type === 'Crypto') return <TrendingDown className="h-4 w-4 text-red-500" />;
    return <Minus className="h-4 w-4 text-gray-400" />;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Oportunidades de Investimento</h1>
        <p className="text-gray-600">Explore nossa seleção de ativos disponíveis</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {assets?.map((asset) => (
          <Card key={asset.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg font-semibold text-gray-900">
                  {asset.name}
                </CardTitle>
                {getTrendIcon(asset.type)}
              </div>
              <div className="flex gap-2">
                <Badge variant="outline" className="text-xs">
                  {asset.type}
                </Badge>
                <Badge variant={getRiskVariant(asset.risk)} className="text-xs">
                  {asset.risk}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-2xl font-bold text-gray-900">
                  R$ {asset.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
                <div className="text-sm text-gray-600">
                  <p className="font-medium">{asset.sector}</p>
                  <p className="text-xs text-gray-500">Cotação atual</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
        <h3 className="font-semibold text-orange-900 mb-2">Diversificação Recomendada</h3>
        <p className="text-orange-700 text-sm">
          Recomendamos diversificar sua carteira entre diferentes classes de ativos para otimizar o risco-retorno.
        </p>
      </div>
    </div>
  );
}