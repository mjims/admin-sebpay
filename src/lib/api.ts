// lib/api.ts
import { axiosInstance } from './axios'
import type { UserListType, UserType } from '@/types/user'
import type { MerchantType } from '@/types/merchant'
import type { TransactionListType, TransactionType } from '@/types/transaction'
import { WithdrawalRequestType } from '@/types/withdrawal'
import { AccountSuspensionType } from '@/types/account-suspension'
import { P2PType } from '@/types/p2p'
import { KycDocumentType, KycDocumentTypeListType } from '@/types/kyc'
import { HistoricalType } from '@/types/historical'

// Récupérer la liste des utilisateurs
export const getUsers = async (): Promise<UserListType[]> => {
  const response = await axiosInstance.get('/users/')
  return response.data
}

// Récupérer la liste des utilisateurs
export const getUserMe = async (): Promise<UserType[]> => {
  const response = await axiosInstance.get('/users/me/')
  return response.data
}

// Récupérer la liste des marchants
export const getMerchants = async (): Promise<MerchantType[]> => {
  const response = await axiosInstance.get('/merchants/')
  return response.data.results
}

// Récupérer la liste des transactions
export const getTransactions = async (): Promise<TransactionListType[]> => {
  const response = await axiosInstance.get('/transactions/')
  return response.data
}

// Récupérer la liste des requêtes de retrait
export const getWithdrawalRequests = async (): Promise<WithdrawalRequestType[]> => {
  const response = await axiosInstance.get('/withdrawal-requests/')
  return response.data.results
}

// Récupérer la liste des utilisateurs suspendus
export const getAccountSuspensions = async (): Promise<AccountSuspensionType[]> => {
  const response = await axiosInstance.get('/account-suspensions/')
  return response.data.results
}

// Récupérer la liste des transferts p2p
export const getP2Ps = async (): Promise<P2PType[]> => {
  const response = await axiosInstance.get('/p2p-transfers/')
  return response.data.results
}

// Recupérer les kycs
export const getKycs = async (): Promise<KycDocumentTypeListType[]> => {
  const response = await axiosInstance.get('/kyc-documents/')
  return response.data
}

// Recupérer les kycs
export const getHistoricals = async (): Promise<HistoricalType[]> => {
  const response = await axiosInstance.get('/merchant-histories/')
  return response.data.results
}

export const resolveSuspension = async ({
  id,
  resolution_notes,
}: {
  id: string
  resolution_notes: string
}) => {

  console.log("L'id console :"+ id)
  const response = await axiosInstance.post(
    `/account-suspensions/${id}/resolve/`,
    { resolution_notes },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )

  return response.data
}

export const suspendMerchant = async (data: {
  merchant: string
  reason: string
  description: string
  required_documents?: object
  status?: string
}) => {
  const response = await axiosInstance.post(
    `/account-suspensions/`,
    {
      merchant: data.merchant,
      reason: data.reason,
      description: data.description,
      ...(data.required_documents && { 
        required_documents: data.required_documents 
      }),
      status: data.status || 'active'
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  return response.data
}

