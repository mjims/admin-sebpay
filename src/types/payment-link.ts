import type { MerchantType } from '@/types/merchant';

export interface PaymentLinkType {
  id: string;
  title: string;
  description: string;
  amount: string;
  observation: string;
  high_risk: boolean;
  currency: string;
  image: string;
  merchant: MerchantType;
  merchant_id: string;
  start_date?: string;
  end_date?: string;
  buyer_pays_fees?: boolean;
}

export interface PaymentLinkListType {
  count: number;
  next: string;
  previous: string;
  results: PaymentLinkType[];
}
