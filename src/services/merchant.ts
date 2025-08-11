import { axiosInstance } from '@/libs/axios';
import { Endpoints } from '@/shared/endpoints';
import type { MerchantType } from '@/types/merchant';

export const createMerchant = async (payload: MerchantType) => {
  return axiosInstance.post(Endpoints.MERCHANTS, payload);
};

export const patchMerchant = async ({
  id,
  payload,
}: {
  id: string;
  payload: MerchantType;
}) => {
  return axiosInstance.patch(`${Endpoints.MERCHANTS}${id}/`, payload);
};

export const deleteMerchant = async (id: string) => {
  return axiosInstance.delete(`${Endpoints.MERCHANTS}${id}/`);
};

export const getMerchantBalance = async (merchantId: string) => {
  return axiosInstance.get(`${Endpoints.MERCHANTS}${merchantId}/balance/`);
};

export const getMerchantStats = async (merchantId: string) => {
  return axiosInstance.get(`${Endpoints.MERCHANTS}${merchantId}/stats/`);
};
