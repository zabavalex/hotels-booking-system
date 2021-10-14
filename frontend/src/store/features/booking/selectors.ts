import { RootState } from '@/store/store';
import { Hotel } from '@/types/hotel';
import { Fetch } from '@/types';
import {Booking} from "@/types/booking";

/**
 * booking list
 * @param state
 */
export const bookingSelector = (state: RootState): Booking[] => {
  return state.booking.bookings;
};


/**
 * booking list request in progress
 * @param state
 */
export const isBookingLoadingSelector = (state: RootState): boolean => {
  return state.booking.bookingFetchingState === Fetch.Pending;
};

/**
 * booking details request in progress
 * @param state
 */
export const isBookingDetailsLoadingSelector = (state: RootState): boolean => {
  return state.booking.bookingDetailsFetchingState === Fetch.Pending;
};

/**
 * booking details
 * @param state
 */
export const bookingDetailsSelector = (state: RootState): Booking => {
  return state.booking.bookingDetails;
};

/**
 * delete in progress
 * @param state
 */
export const isDeleteLoadingSelector = (state: RootState): boolean => {
  return state.hotel.bookingFetchingState === Fetch.Pending;
};

/**
 * pay in progress
 * @param state
 */
export const isPayLoadingSelector = (state: RootState): boolean => {
  return state.hotel.bookingFetchingState === Fetch.Pending;
};


