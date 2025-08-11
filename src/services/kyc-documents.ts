import { axiosInstance } from '@/libs/axios';
import { Endpoints } from '@/shared/endpoints';

export const createKycDocument = async (payload: FormData) => {
  return axiosInstance.post(Endpoints.KYC_DOCUMENTS, payload, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const patchKycDocument = ({
  id,
  payload,
}: {
  id: string;
  payload: FormData;
}) => {
  return axiosInstance.patch(`${Endpoints.KYC_DOCUMENTS}${id}/`, payload, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const approveKycDocument = async (id: string) => {
  return axiosInstance.post(`${Endpoints.KYC_DOCUMENTS}${id}/approve/`);
};

export const rejectKycDocument = async (id: string, notes?: string) => {
  return axiosInstance.post(`${Endpoints.KYC_DOCUMENTS}${id}/reject/`, {
    notes,
  });
};
