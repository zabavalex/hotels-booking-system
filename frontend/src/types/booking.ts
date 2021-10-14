export interface BookingsResult {
  response: Booking[];
  // success: boolean;
}

export interface Booking {
  uuid?: string;
  id: string;
  dateFrom: string;
  dateTo: string;
  hotelId: string;
  clientId: string;
}

export interface BookingDetails {
  uuid?: string;
  id: string;
  dateFrom: string;
  dateTo: string;
  hotelId: string;
  clientId: string;
  name: string;
  country: string;
  city: string;
  address: string;
  description: string;
  ownerLogin: string;
  price: number;
}


