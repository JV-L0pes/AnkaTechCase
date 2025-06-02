export interface Client {
    id: number;
    name: string;
    email: string;
    status: boolean;
    assets?: Asset[];
    createdAt: string;
    updatedAt: string;
  }
  
  export interface Asset {
    id: number;
    name: string;
    value: number;
    clientId?: number;
    client?: Client;
    createdAt?: string;
    updatedAt?: string;
  }
  
  export interface FixedAsset {
    id: number;
    name: string;
    value: number;
    type: string;
    risk: string;
    sector: string;
  }
  
  export interface CreateClientData {
    name: string;
    email: string;
    status?: boolean;
  }
  
  export interface UpdateClientData {
    name?: string;
    email?: string;
    status?: boolean;
  }
  
  export interface CreateAssetData {
    name: string;
    value: number;
    clientId: number;
  }