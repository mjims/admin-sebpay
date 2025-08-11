import { axiosInstance } from '@/libs/axios';
import { Endpoints } from '@/shared/endpoints';
import type {
  AfribaPayPaymentRequest,
  AfribaPayPaymentResponse,
} from '@/types/transaction';
import type { PayoutRequest } from '@/types/withdrawal';

// Créer un paiement AfribaPAY pour un lien de paiement
export const createAfribaPayPayment = async (
  linkId: string,
  payload: AfribaPayPaymentRequest,
): Promise<AfribaPayPaymentResponse> => {
  const response = await axiosInstance.post(
    `${Endpoints.PAYMENT_LINKS}${linkId}/afribapay/`,
    payload,
  );
  return response.data;
};

// Créer un décaissement AfribaPAY
export const createAfribaPayout = async (payload: PayoutRequest) => {
  return axiosInstance.post(Endpoints.AFRIBAPAY_PAYOUT, payload);
};

// Obtenir le statut d'une transaction
export const getTransactionStatus = async (transactionId: string) => {
  return axiosInstance.get(`${Endpoints.TRANSACTIONS}${transactionId}/`);
};

// Créer un remboursement
export const createRefund = async (transactionId: string, reason?: string) => {
  return axiosInstance.post(
    `${Endpoints.TRANSACTIONS}${transactionId}/refund/`,
    {
      reason,
    },
  );
};

// Obtenir les détails d'un lien de paiement (pour les invités)
export const getPaymentLink = async (id: string) => {
  const response = await axiosInstance.get(`${Endpoints.PAYMENT_LINKS}${id}/`);
  return response.data;
};
