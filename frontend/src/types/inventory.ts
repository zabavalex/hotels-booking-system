export interface Inventory {
  // Client side generated ID for 100% uniqueness
  // Backend doesn't have unique fields
  uuid?: string;

  closeReason: string;
  merchantName: string;
  merchantNumber: string;
  serviceResult: {
    errCode: number;
    errMsg: string;
  };
  serviceState: string;
  stockStatus: string;
  terminalAddress: string;
  terminalId: string;
  terminalLastActive: string;
  terminalType: string;
}

export interface InventoryFilter {
  terminalNo: string;
  merchantNo: string;
}
