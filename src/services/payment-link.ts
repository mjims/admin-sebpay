import { axiosInstance } from '@/libs/axios';
import { Endpoints } from '@/shared/endpoints';
import { useAuthStore } from '@/stores/user';

export const createPaymentLink = async (payload: FormData) => {
  const { user } = useAuthStore.getState();
  payload.append('merchant_id', user?.roles[0]?.merchant?.id as string);
  return axiosInstance.post(Endpoints.PAYMENT_LINKS, payload, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const patchPaymentLink = async ({
  id,
  payload,
}: {
  id: string;
  payload: FormData;
}) => {
  const { user } = useAuthStore.getState();
  payload.append('merchant_id', user?.roles[0]?.merchant?.id as string);
  return axiosInstance.patch(`${Endpoints.PAYMENT_LINKS}${id}/`, payload, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const deletePaymentLink = async (id: string) => {
  return axiosInstance.delete(`${Endpoints.PAYMENT_LINKS}${id}/`);
};
