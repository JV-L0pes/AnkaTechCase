'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { useClients, useDeleteClient } from '@/hooks/useClients';
import { Client } from '@/types';
import { ClientForm } from './ClientForm';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';

export function ClientList() {
  const { data: clients, isLoading, error } = useClients();
  const deleteClient = useDeleteClient();
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [viewingClient, setViewingClient] = useState<Client | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      try {
        await deleteClient.mutateAsync(id);
      } catch (error) {
        console.error('Erro ao excluir cliente:', error);
      }
    }
  };

  const handleEdit = (client: Client) => {
    setEditingClient(client);
    setIsFormOpen(true);
  };

  const handleView = (client: Client) => {
    setViewingClient(client);
    setIsViewOpen(true);
  };

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    setEditingClient(null);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                  <div className="h-3 bg-gray-200 rounded w-48"></div>
                </div>
                <div className="h-8 bg-gray-200 rounded w-20"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Erro ao carregar clientes</p>
      </div>
    );
  }

  if (!clients || clients.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum cliente cadastrado</h3>
        <p className="text-gray-500 mb-6">Comece adicionando seu primeiro cliente ao sistema</p>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={() => setEditingClient(null)}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Cliente
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Novo Cliente</DialogTitle>
              <DialogDescription>
                Preencha os dados para cadastrar um novo cliente.
              </DialogDescription>
            </DialogHeader>
            <ClientForm client={editingClient || undefined} onSuccess={handleFormSuccess} />
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clientes</h1>
          <p className="text-gray-600">Gerencie sua carteira de clientes</p>
        </div>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={() => setEditingClient(null)}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Novo Cliente
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {editingClient ? 'Editar Cliente' : 'Novo Cliente'}
              </DialogTitle>
              <DialogDescription>
                {editingClient ? 'Edite os dados do cliente.' : 'Preencha os dados para cadastrar um novo cliente.'}
              </DialogDescription>
            </DialogHeader>
            <ClientForm client={editingClient || undefined} onSuccess={handleFormSuccess} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {clients.map((client) => (
          <Card key={client.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{client.name}</h3>
                    <Badge variant={client.status ? 'default' : 'secondary'}>
                      {client.status ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </div>
                  <p className="text-gray-600 mb-1">{client.email}</p>
                  <p className="text-sm text-gray-500">
                    {client.assets?.length || 0} ativos em carteira
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleView(client)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(client)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(client.id)}
                    disabled={deleteClient.isPending}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalhes do Cliente</DialogTitle>
            <DialogDescription>
              Veja as informações detalhadas do cliente selecionado.
            </DialogDescription>
          </DialogHeader>
          {viewingClient && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-900">Nome</Label>
                  <p className="mt-1 text-gray-700">{viewingClient.name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-900">Email</Label>
                  <p className="mt-1 text-gray-700">{viewingClient.email}</p>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-900">Status</Label>
                <div className="mt-1">
                  <Badge variant={viewingClient.status ? 'default' : 'secondary'}>
                    {viewingClient.status ? 'Ativo' : 'Inativo'}
                  </Badge>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-900">Carteira de Investimentos</Label>
                {viewingClient.assets && viewingClient.assets.length > 0 ? (
                  <div className="mt-3 space-y-3">
                    {viewingClient.assets.map((asset) => (
                      <div key={asset.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                        <span className="font-medium text-gray-900">{asset.name}</span>
                        <span className="font-semibold text-green-600">
                          R$ {asset.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                    ))}
                    <div className="border-t pt-3">
                      <div className="flex justify-between items-center font-semibold">
                        <span className="text-gray-900">Total Investido:</span>
                        <span className="text-green-600 text-lg">
                          R$ {viewingClient.assets.reduce((sum, asset) => sum + asset.value, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="mt-2 text-gray-500">Nenhum ativo alocado</p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}