import { axiosInstance } from '@/libs/axios';
import { Endpoints } from '@/shared/endpoints';
import type {
  AccountSuspensionType,
  ResolveSuspensionRequest,
} from '@/types/account-suspension';

export const createAccountSuspension = async (
  payload: Omit<
    AccountSuspensionType,
    'id' | 'created_at' | 'suspended_by' | 'suspended_by_name'
  >,
) => {
  return axiosInstance.post(Endpoints.ACCOUNT_SUSPENSIONS, payload);
};

export const resolveAccountSuspension = async ({
  id,
  payload,
}: {
  id: string;
  payload: ResolveSuspensionRequest;
}) => {
  return axiosInstance.post(
    `${Endpoints.ACCOUNT_SUSPENSIONS}${id}/resolve/`,
    payload,
  );
};

export const getActiveSuspensions = async () => {
  return axiosInstance.get(`${Endpoints.ACCOUNT_SUSPENSIONS}active/`);
};
