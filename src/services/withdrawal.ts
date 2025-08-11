import { axiosInstance } from '@/libs/axios';
import { Endpoints } from '@/shared/endpoints';
import type { WithdrawalRequestType } from '@/types/withdrawal';

export const createWithdrawalRequest = async (
  payload: Omit<WithdrawalRequestType, 'id' | 'created_at' | 'status'>,
) => {
  return axiosInstance.post(Endpoints.WITHDRAWALS, payload);
};

export const updateWithdrawalRequest = async ({
  id,
  payload,
}: {
  id: string;
  payload: Partial<WithdrawalRequestType>;
}) => {
  return axiosInstance.patch(`${Endpoints.WITHDRAWALS}${id}/`, payload);
};

export const deleteWithdrawalRequest = async (id: string) => {
  return axiosInstance.delete(`${Endpoints.WITHDRAWALS}${id}/`);
};

export const approveWithdrawal = async (id: string) => {
  return axiosInstance.post(`${Endpoints.WITHDRAWALS}${id}/approve/`);
};

export const rejectWithdrawal = async (id: string) => {
  return axiosInstance.post(`${Endpoints.WITHDRAWALS}${id}/reject/`);
};
