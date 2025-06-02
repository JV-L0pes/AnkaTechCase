import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Asset, FixedAsset, CreateAssetData } from '@/types';

export const useFixedAssets = () => {
  return useQuery<FixedAsset[]>({
    queryKey: ['assets', 'fixed'],
    queryFn: async () => {
      const { data } = await api.get('/assets');
      return data.data || [];
    },
  });
};

export const useClientAssets = (clientId: number) => {
  return useQuery<Asset[]>({
    queryKey: ['assets', 'client', clientId],
    queryFn: async () => {
      const { data } = await api.get(`/clients/${clientId}/assets`);
      return data.data || [];
    },
    enabled: !!clientId,
  });
};

export const useCreateAsset = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: CreateAssetData) => {
      const response = await api.post('/assets', data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['assets', 'client', variables.clientId] });
      queryClient.invalidateQueries({ queryKey: ['clients'] });
    },
  });
};