import { configureStore } from '@reduxjs/toolkit';

import garageReducer from '../pages/garage/garageSlice';
const store = configureStore({
  reducer: {
    garage: garageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
