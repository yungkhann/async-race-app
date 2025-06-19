import { configureStore } from '@reduxjs/toolkit';
import winnersReducer from '../pages/winners/winnersSlice';
import garageReducer from '../pages/garage/garageSlice';
const store = configureStore({
  reducer: {
    garage: garageReducer,
    winners: winnersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
