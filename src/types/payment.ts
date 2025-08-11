export interface PaymentFormData {
  operator: string;
  phone_number: string;
  country: string;
  amount?: number;
}

export interface MobileMoneyOperator {
  code: string;
  name: string;
  countries: string[];
  logo?: string;
  otp_required?: boolean;
  ussd_code?: string;
}

export const MOBILE_MONEY_OPERATORS: MobileMoneyOperator[] = [
  // Orange Money
  {
    code: 'orange',
    name: 'Orange Money',
    countries: ['BF', 'CI', 'CM', 'CD', 'GN', 'ML', 'SN'],
    otp_required: true,
  },
  // MTN Money
  {
    code: 'mtn',
    name: 'MTN Money',
    countries: ['BJ', 'CI', 'CM', 'GN'],
    otp_required: false,
  },
  // Moov Money
  {
    code: 'moov',
    name: 'Moov Money',
    countries: ['BJ', 'BF', 'CI', 'GA', 'ML', 'TG'],
    otp_required: false,
  },
  // Wave Money
  {
    code: 'wave',
    name: 'Wave Money',
    countries: ['CI', 'SN'],
    otp_required: false,
  },
  // Airtel Money
  {
    code: 'airtel',
    name: 'Airtel Money',
    countries: ['CD', 'GA', 'NE'],
    otp_required: false,
  },
  // Mpesa
  {
    code: 'mpesa',
    name: 'Mpesa Money',
    countries: ['CD'],
    otp_required: false,
  },
  // Vodacom
  {
    code: 'vodacom',
    name: 'Vodacom',
    countries: ['CD'],
    otp_required: false,
  },
  // Afri Money
  {
    code: 'afrimoney',
    name: 'Afri Money',
    countries: ['CD'],
    otp_required: false,
  },
  // Wallet LigdiCash
  {
    code: 'wligdicash',
    name: 'Wallet LigdiCash',
    countries: ['BF'],
    otp_required: true,
  },
  // Free Money
  {
    code: 'free',
    name: 'Free Money',
    countries: ['SN'],
    otp_required: false,
  },
  // E-money (Expresso)
  {
    code: 'expresso',
    name: 'E-money (Expresso)',
    countries: ['SN'],
    otp_required: false,
  },
  // T-Money
  {
    code: 'tmoney',
    name: 'T-Money',
    countries: ['TG'],
    otp_required: false,
  },
  // Celtiis Money
  {
    code: 'celtiis',
    name: 'Celtiis Money',
    countries: ['BJ'],
    otp_required: false,
  },
  // Coris Money
  {
    code: 'coris',
    name: 'Coris Money',
    countries: ['BJ'],
    otp_required: false,
  },
];

export const COUNTRIES = [
  {
    code: 'BJ',
    name: 'Bénin',
    currency: 'XOF',
    flag: '🇧🇯',
    prefix: '229',
    taxes: 18,
  },
  {
    code: 'BF',
    name: 'Burkina Faso',
    currency: 'XOF',
    flag: '🇧🇫',
    prefix: '226',
    taxes: 18,
  },
  {
    code: 'CD',
    name: 'R.D.C',
    currency: 'CDF',
    flag: '🇨🇩',
    prefix: '243',
    taxes: 16,
  },
  {
    code: 'CI',
    name: "Côte d'Ivoire",
    currency: 'XOF',
    flag: '🇨🇮',
    prefix: '225',
    taxes: 18,
  },
  {
    code: 'CM',
    name: 'Cameroun',
    currency: 'XAF',
    flag: '🇨🇲',
    prefix: '237',
    taxes: 19.25,
  },
  {
    code: 'GA',
    name: 'Gabon',
    currency: 'XAF',
    flag: '🇬🇦',
    prefix: '241',
    taxes: 18,
  },
  {
    code: 'GN',
    name: 'Guinée',
    currency: 'GNF',
    flag: '🇬🇳',
    prefix: '224',
    taxes: 18,
  },
  {
    code: 'ML',
    name: 'Mali',
    currency: 'XOF',
    flag: '🇲🇱',
    prefix: '223',
    taxes: 18,
  },
  {
    code: 'NE',
    name: 'Niger',
    currency: 'XOF',
    flag: '🇳🇪',
    prefix: '227',
    taxes: 18,
  },
  {
    code: 'SN',
    name: 'Sénégal',
    currency: 'XOF',
    flag: '🇸🇳',
    prefix: '221',
    taxes: 18,
  },
  {
    code: 'TG',
    name: 'Togo',
    currency: 'XOF',
    flag: '🇹🇬',
    prefix: '228',
    taxes: 18,
  },
];
