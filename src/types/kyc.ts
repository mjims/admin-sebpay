// Types pour les documents KYC
export interface KycDocumentTypeType {
  id: string;
  code: string;
  label: string;
  country_code: string;
}

export interface KycDocumentType {
  id: string;
  merchant: string;
  document_number: string;
  document_type: KycDocumentTypeType;
  document_type_id: string;
  file: string;
  status: 'pending' | 'approved' | 'rejected';
  uploaded_at: string;
}

export interface KycDocumentTypeListType {
  count: number;
  next: string;
  previous: string;
  results: KycDocumentType[];
}

export interface KycDocumentListType {
  count: number;
  next: string;
  previous: string;
  results: KycDocumentType[];
}
