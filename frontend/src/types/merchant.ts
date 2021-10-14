import { ErrorObject } from './index';

export interface Merchant {
  serviceResult: ErrorObject;
  legalName: string;
  merchantNumber: string;
  merchantName: string;
}

export interface MerchTransactionStatistics {
  period: string;
  serviceResult: ErrorObject;
  totalSuccessfulTransactionsAmount: number;
  totalSuccessfulTransactionsCount: number;
  totalTransactionsAmount: number;
  totalTransactionsCount: number;
  totalUnsuccessfulTransactionsAmount: number;
  totalUnsuccessfulTransactionsCount: number;
}
