export interface HotelsResult {
  response: Hotel[];
  // success: boolean;
}

export interface Hotel {
  uuid?: string;
  id: string;
  name: string;
  country: string;
  city: string;
  address: string;
  description: string;
  numberAvailableRooms: number;
  numberRooms: number;
  ownerLogin: string;
  price: number;
}

export interface HotelsFilter {
  country: string;
  city: string;
  dateFrom: string;
  dateTo: string;
}

export interface HotelCreate {
  name : string;
  country : string;
  city : string;
  address : string;
  description : string;
  numberAvailableRooms : number;
  numberRooms : number;
  ownerLogin : string;
  price : number;
}


export interface BookingParams {
  refundAmount: string;
  description: string;
}
