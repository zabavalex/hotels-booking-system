import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import config from '@/config';
import { RegistrationResult, SessionResult, SimpleResult, UserResult } from '@/types/auth';
import { ErrorObject, Fetch } from '@/types/index';
import { getErrorFromResponse } from '@/store/utils';
import { antNotification } from '@/utils/helpers';
import {resetDetails, resetHotel} from "@/store/features/hotel/slice";
import {resetBooking} from "@/store/features/booking/slice";

type AuthState = {
  isAuthorised: boolean;
  authFetchingState: Fetch;
  sessionFetchingState: Fetch;
  error: ErrorObject;
};

const initialState: AuthState = {
  isAuthorised: false,
  authFetchingState: Fetch.Idle,
  sessionFetchingState: Fetch.Idle,
  error: null
};

type LoginParams = {
  username: string;
  password: string;
};
/**
 * Login user
 *
 * @param userName
 * @param password
 */
export const login = createAsyncThunk('auth/login', async (params: LoginParams, { rejectWithValue }) => {
  try {
    const { data } = await axios.post<UserResult>(config.apiMethods.login, {
      username: params.username,
      password: params.password
    });
    return data;
  } catch (error) {
    return rejectWithValue(getErrorFromResponse(error));
  }
});

/**
 * Logout user
 */
export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue, dispatch }) => {
  localStorage.removeItem("user");
  await Promise.all([
    dispatch(resetDetails()),
    dispatch(resetBooking()),
    dispatch(resetHotel()),
  ]);
  return;
});

type RegistrationParams = {
  login: string;
  password: string;
  email: string;
};
/**
 *  User registration
 *
 * @param username
 * @param password
 */
export const registration = createAsyncThunk(
  'auth/registration',
  async (params: RegistrationParams, { rejectWithValue }) => {
    try {
      const { data } = await axios.put<RegistrationParams>(config.apiMethods.registration, params);
      return data;
    } catch (error) {
      return rejectWithValue(getErrorFromResponse(error));
    }
  },
);

/**
 * Checks is session active
 */
export const checkSession = createAsyncThunk('auth/checkSession', async (_, { rejectWithValue }) => {
  try {
    const user = localStorage.getItem("user") != null ? JSON.parse(localStorage.getItem("user")) : null;
    const { data } = await axios.post<SessionResult>(config.apiMethods.verify, user != null ? user.token.toString() : '');
    return data;
  } catch (error) {
    return rejectWithValue(getErrorFromResponse(error));
  }
});

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /* login */

    builder.addCase(login.pending, (state) => {
      state.authFetchingState = Fetch.Pending;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isAuthorised = action && action.payload && action.payload.token && action.payload.token != '';
      state.authFetchingState = Fetch.Fulfilled
    });
    builder.addCase(login.rejected, (state, action) => {
      state.authFetchingState = Fetch.Rejected;
      state.error = action.payload as ErrorObject;
      state.isAuthorised = false;
    });

    /* logout */

    builder.addCase(logout.pending, (state) => {
      state.authFetchingState = Fetch.Fulfilled;
      state.error = null;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.authFetchingState = Fetch.Fulfilled;
      state.isAuthorised = false;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.error = action.payload as ErrorObject;
      state.authFetchingState = Fetch.Rejected;
    });

    /* change password */

    builder.addCase(registration.pending, (state) => {
      state.authFetchingState = Fetch.Pending;
      state.error = null;
      state.isAuthorised = false;
    });
    builder.addCase(registration.fulfilled, (state) => {
      state.authFetchingState = Fetch.Fulfilled;
    });
    builder.addCase(registration.rejected, (state, action) => {
      state.error = action.payload as ErrorObject;
      state.authFetchingState = Fetch.Rejected;
    });

    /* checkSession */

    builder.addCase(checkSession.pending, (state) => {
      state.sessionFetchingState = Fetch.Pending;
      state.error = null;
    });
    builder.addCase(checkSession.fulfilled, (state, action) => {
      state.isAuthorised = action && action.payload && action.payload.success == true;
      state.authFetchingState = Fetch.Fulfilled
    });
    builder.addCase(checkSession.rejected, (state, action) => {
      state.error = action.payload as ErrorObject;
      state.sessionFetchingState = Fetch.Rejected;
      state.isAuthorised = false;
      localStorage.removeItem("user");
    });
  },
});

export default slice.reducer;
