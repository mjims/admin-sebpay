import { axiosInstance } from '@/libs/axios';
import type {
  APIKeyCreateType,
  APIKeyType,
  WebhookEndpointCreateType,
  WebhookEndpointType,
} from '@/types/api';

export const apiKeyService = {
  getAll: async (): Promise<APIKeyType[]> => {
    const response = await axiosInstance.get('/api/api-keys/');
    return response.data;
  },

  create: async (data: APIKeyCreateType): Promise<APIKeyType> => {
    const response = await axiosInstance.post('/api/api-keys/', data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/api/api-keys/${id}/`);
  },

  regenerate: async (id: string): Promise<APIKeyType> => {
    const response = await axiosInstance.post(
      `/api/api-keys/${id}/regenerate/`,
    );
    return response.data;
  },

  update: async (
    id: string,
    data: Partial<APIKeyType>,
  ): Promise<APIKeyType> => {
    const response = await axiosInstance.patch(`/api/api-keys/${id}/`, data);
    return response.data;
  },
};

export const webhookService = {
  getAll: async (): Promise<WebhookEndpointType[]> => {
    const response = await axiosInstance.get('/api/webhook-endpoints/');
    return response.data;
  },

  create: async (
    data: WebhookEndpointCreateType,
  ): Promise<WebhookEndpointType> => {
    const response = await axiosInstance.post('/api/webhook-endpoints/', data);
    return response.data;
  },

  update: async (
    id: string,
    data: Partial<WebhookEndpointType>,
  ): Promise<WebhookEndpointType> => {
    const response = await axiosInstance.patch(
      `/api/webhook-endpoints/${id}/`,
      data,
    );
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/api/webhook-endpoints/${id}/`);
  },
};
