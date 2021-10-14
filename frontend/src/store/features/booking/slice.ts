import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import config from '@/config';
import { getErrorFromResponse } from '@/store/utils';
import { ErrorObject, Fetch} from '@/types/index';
import type { RootState } from '@/store/store';
import {Booking, BookingDetails, BookingsResult} from "@/types/booking";
import {Hotel} from "@/types/hotel";
import {bookingHotel, getHotels} from "@/store/features/hotel/slice";

type BookingState = {
  bookings: Booking[];
  bookingDetails: BookingDetails;
  bookingDetailsFetchingState: Fetch;
  bookingFetchingState: Fetch;
  deleteFetchingState: Fetch;
  payFetchingState: Fetch;
  error: ErrorObject;
};

const initialState: BookingState = {
  bookings: [],
  bookingDetails: null,
  bookingDetailsFetchingState: Fetch.Idle,
  bookingFetchingState: Fetch.Idle,
  deleteFetchingState: Fetch.Idle,
  payFetchingState: Fetch.Idle,
  error: null,
};

/**
 * Gets bookings by filter
 *
 * @param nextPage
 */
export const getBookingsList = createAsyncThunk(
  'booking/getAll',
  async (_, { rejectWithValue, getState }) => {
    try {
      const user = localStorage.getItem("user") != null ? JSON.parse(localStorage.getItem("user")) : null;
      const { id } = user;
      const formatUrl = config.apiMethods.getAllByClientId + id + "/getall";

      const { data } = await axios.get<BookingsResult>(formatUrl,
          {
          headers: {
          'Authorization': 'Bearer_' + JSON.parse(localStorage.getItem("user")).token
        }
      });
      console.log(JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(getErrorFromResponse(error));
    }
  },
);

/**
 * Gets bookings details
 *
 * @param nextPage
 */
export const getBookingsDetails = createAsyncThunk(
    'booking/getDetails',
    async (params : Booking, { rejectWithValue, dispatch }) => {
      try {
        dispatch(resetDetails());
        const formatUrl = config.apiMethods.getBookingDetails + params.id + "/getdetails";
        const { data } = await axios.get<BookingDetails>(formatUrl,
            {
              headers: {
                'Authorization': 'Bearer_' + JSON.parse(localStorage.getItem("user")).token
              }
            });
        console.log(JSON.stringify(data));
        return data;
      } catch (error) {
        return rejectWithValue(getErrorFromResponse(error));
      }
    },
);

/**
 * Sends delete booking request
 *
 */
export const deleteBooking = createAsyncThunk(
    'booking/delete',
    async (_, { rejectWithValue, getState, dispatch }) => {
      try {
        const details = (getState() as RootState).booking.bookingDetails;
        const formatUrl = config.apiMethods.bookingDelete + details.id;
        await axios.delete<void>(formatUrl,
            {
              headers: {
                'Authorization': 'Bearer_' + JSON.parse(localStorage.getItem("user")).token
              }
            });
        dispatch(getHotels());
        dispatch(getBookingsList())
        dispatch(resetDetails())
        return;
      } catch (error) {
        return rejectWithValue(getErrorFromResponse(error));
      }
    },
);


const slice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    resetBooking() {
      return initialState;
    },

    resetDetails(state) {
      state.bookingDetails = null;
    },
  },
  extraReducers: (builder) => {
    /* booking */

    builder.addCase(getBookingsList.pending, (state) => {
      state.deleteFetchingState = Fetch.Pending;
      state.error = null;
    });
    builder.addCase(getBookingsList.fulfilled, (state, action) => {
      console.log(JSON.stringify(action.payload));
      const response = Object.values(action.payload);
      console.log(JSON.stringify(response));

      state.deleteFetchingState = Fetch.Fulfilled;
      state.bookings = response.length ? formatBooking(response) : [];
      state.error = null;
    });
    builder.addCase(getBookingsList.rejected, (state, action) => {
      state.deleteFetchingState = Fetch.Rejected;
      state.error = action.payload as ErrorObject;
    });

    /* bookingDetails */

    builder.addCase(getBookingsDetails.pending, (state) => {
      state.bookingDetailsFetchingState = Fetch.Pending;
      state.error = null;
    });
    builder.addCase(getBookingsDetails.fulfilled, (state, action) => {
      const { ...rest } = action.payload;
      console.log(JSON.stringify(state.bookingDetails));
      state.bookingDetailsFetchingState = Fetch.Fulfilled;
      state.bookingDetails = {
        ...rest
      };
      state.error = null;
    });
    builder.addCase(getBookingsDetails.rejected, (state, action) => {
      state.bookingDetailsFetchingState = Fetch.Rejected;
      state.error = action.payload as ErrorObject;
    });
    /* refundTransaction */

    builder.addCase(deleteBooking.pending, (state) => {
      state.deleteFetchingState = Fetch.Pending;
      state.error = null;
    });
    builder.addCase(deleteBooking.fulfilled, (state) => {
      state.deleteFetchingState = Fetch.Fulfilled;
      state.error = null;
    });
    builder.addCase(deleteBooking.rejected, (state, action) => {
      state.deleteFetchingState = Fetch.Rejected;
      state.error = action.payload as ErrorObject;
    });
  },
});

function formatBooking(bookings: Booking[]): Booking[] {
  return bookings.map((hotel) => {
    const formattedData = Object.keys(hotel).reduce((h, key) => {
      h[key] = ['', null].includes(hotel[key]) ? '-' : String(hotel[key]);
      return h;
    }, {} as Booking);

    formattedData.uuid = uuidv4();
    return formattedData;
  });
}

function formatDate(date: string) {
  if (!date) {
    return '-';
  }

  const year = date.slice(0, 4);
  const month = date.slice(4, 6);
  const day = date.slice(6, 8);

  return `${day}-${month}-${year}`;
}

function formatTime(fullTime: string) {
  const [time, zone] = fullTime.split(' ');

  if (!time) {
    return '-';
  }

  const hours = time.slice(0, 2);
  const minutes = time.slice(2, 4);
  const seconds = time.slice(4, 6);

  return `${hours}:${minutes}:${seconds} ${zone}`;
}

export const { resetBooking, resetDetails} = slice.actions;
export default slice.reducer;
