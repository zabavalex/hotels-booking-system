import { RootState } from '@/store/store';
import { Hotel } from '@/types/hotel';
import { Fetch } from '@/types';

/**
 * hotel list
 * @param state
 */
export const hotelsSelector = (state: RootState): Hotel[] => {
  return state.hotel.hotels;
};

/**
 * hotel details
 * @param state
 */
export const hotelDetailsSelector = (state: RootState): Hotel => {
  return state.hotel.hotelDetails;
};

/**
 * hotel list request in progress
 * @param state
 */
export const isHotelLoadingSelector = (state: RootState): boolean => {
  return state.hotel.hotelFetchingState === Fetch.Pending;
};

/**
 * hotel details request in progress
 * @param state
 */
export const isHotelDetailsLoadingSelector = (state: RootState): boolean => {
  return state.hotel.hotelDetailsFetchingState === Fetch.Pending;
};

/**
 * booking in progress
 * @param state
 */
export const isBookingLoadingSelector = (state: RootState): boolean => {
  return state.hotel.bookingFetchingState === Fetch.Pending;
};

