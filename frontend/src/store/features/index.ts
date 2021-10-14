import { combineReducers } from '@reduxjs/toolkit';

import authReducer from './auth/slice';
// import merchantReducer from './merchant/slice';
// import contactReducer from './contact/slice';
// import inventoryReducer from './inventory/slice';
import hotelReducer from './hotel/slice';
import bookingReducer from './booking/slice'

const rootReducer = combineReducers({
  auth: authReducer,
  // merchant: merchantReducer,
  // contact: contactReducer,
  // inventory: inventoryReducer,
  hotel: hotelReducer,
  booking: bookingReducer,
});

export default rootReducer;
