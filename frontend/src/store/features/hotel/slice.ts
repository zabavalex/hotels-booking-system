import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import config from '@/config';
import { getErrorFromResponse } from '@/store/utils';
import { ErrorObject, Fetch} from '@/types/index';
import {
  Hotel,
  HotelsResult,
  HotelsFilter,
} from '@/types/hotel';
import type { RootState } from '@/store/store';

type HotelState = {
  hotels: Hotel[];
  hotelDetails: Hotel;
  filter: HotelsFilter;
  hotelFetchingState: Fetch;
  hotelDetailsFetchingState: Fetch;
  bookingFetchingState: Fetch;
  error: ErrorObject;
};

const initialState: HotelState = {
  hotels: [],
  hotelDetails: null,
  filter: null,
  hotelFetchingState: Fetch.Idle,
  hotelDetailsFetchingState: Fetch.Idle,
  bookingFetchingState: Fetch.Idle,
  error: null,
};

/**
 * Gets hotels by filter
 *
 */
export const getHotels = createAsyncThunk(
  'hotels/getallbyfilter',
  async (_, { rejectWithValue, getState }) => {
    try {
      const { filter } = (getState() as RootState).hotel;
      const { data } = await axios.post<HotelsResult>(config.apiMethods.getHotels,
          {
        dateFrom: filter.dateFrom,
        dateTo: filter.dateTo,
        city: filter.city,
        country: filter.country,
      }
      ,
          {
          headers: {
          'Authorization': 'Bearer_' + JSON.parse(localStorage.getItem("user")).token
        }
      });
      return data;
    } catch (error) {
      return rejectWithValue(getErrorFromResponse(error));
    }
  },
);

/**
 * Sends create booking request
 *
 */
export const bookingHotel = createAsyncThunk(
  'hotels/bookingHotel',
  async (_, { rejectWithValue, getState, dispatch }) => {
    try {
      const details = (getState() as RootState).hotel.hotelDetails;
      const filter = (getState() as RootState).hotel.filter;
      const user = localStorage.getItem("user") != null ? JSON.parse(localStorage.getItem("user")) : null;
      await axios.put<void>(config.apiMethods.bookingCreate, {
        dateFrom : filter.dateFrom,
        dateTo : filter.dateTo,
        hotelId : details.id,
        clientId : user.id,
      },
          {
            headers: {
              'Authorization': 'Bearer_' + JSON.parse(localStorage.getItem("user")).token
            }
          });
      dispatch(getHotels());
      return;
    } catch (error) {
      return rejectWithValue(getErrorFromResponse(error));
    }
  },
);


const slice = createSlice({
  name: 'hotel',
  initialState,
  reducers: {
    saveFilter(state, action) {
      state.filter = action.payload;
    },

    resetDetails(state) {
      state.hotelDetails = null;
    },

    saveDetails(state, action){
      const { ...rest } = action.payload;
      state.hotelDetails = {
        ...rest,
      };
    },

    resetHotel() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    /* legalEntityTransactions */

    builder.addCase(getHotels.pending, (state) => {
      state.hotelFetchingState = Fetch.Pending;
      state.error = null;
    });
    builder.addCase(getHotels.fulfilled, (state, action) => {
      const response = Object.values(action.payload);

      state.hotelFetchingState = Fetch.Fulfilled;
      state.hotels = response.length ? formatHotel(response) : [];
      state.error = null;
    });
    builder.addCase(getHotels.rejected, (state, action) => {
      state.hotelFetchingState = Fetch.Rejected;
      state.error = action.payload as ErrorObject;
    });

    /* booking hotel */

    builder.addCase(bookingHotel.pending, (state) => {
      state.bookingFetchingState = Fetch.Pending;
      state.error = null;
    });
    builder.addCase(bookingHotel.fulfilled, (state) => {
      state.bookingFetchingState = Fetch.Fulfilled;
      state.error = null;
    });
    builder.addCase(bookingHotel.rejected, (state, action) => {
      state.bookingFetchingState = Fetch.Rejected;
      state.error = action.payload as ErrorObject;
    });
  },
});

function formatHotel(hotels: Hotel[]): Hotel[] {
  return hotels.map((hotel) => {
    const formattedData = Object.keys(hotel).reduce((h, key) => {
      h[key] = ['', null].includes(hotel[key]) ? '-' : String(hotel[key]);
      return h;
    }, {} as Hotel);

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

export const { resetHotel, resetDetails, saveFilter, saveDetails } = slice.actions;
export default slice.reducer;
