import { createSlice } from '@reduxjs/toolkit';
import type { Car } from '../../types/types';
import type { PayloadAction } from '@reduxjs/toolkit';
import { fetchCars } from './thunk';

interface GarageState {
  cars: Car[];
  selectedCar: Car | null;
  page: number;
  loading: boolean;
}

const initialState: GarageState = {
  cars: [],
  selectedCar: null,
  page: 1,
  loading: false,
};

const garageSlice = createSlice({
  name: 'garage',
  initialState,
  reducers: {
    setCars(state, action: PayloadAction<Car[]>) {
      state.cars = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setSelectedCar(state, action: PayloadAction<Car | null>) {
      state.selectedCar = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCars.fulfilled, (state, action: PayloadAction<Car[]>) => {
        state.cars = action.payload;
        state.loading = false;
      })
      .addCase(fetchCars.rejected, (state) => {
        state.loading = false;
      });
  },
});
export const { setCars, setPage, setSelectedCar } = garageSlice.actions;
export default garageSlice.reducer;
