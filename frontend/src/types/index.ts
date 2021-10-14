export enum Fetch {
  Idle = 'idle',
  Pending = 'pending',
  Fulfilled = 'fulfilled',
  Rejected = 'rejected',
}

export interface ErrorObject {
  errTitle: string;
  errMsg: string;
  errCode: number;
}

export interface PaginationData {
  page: number;
  isLast: boolean;
}
