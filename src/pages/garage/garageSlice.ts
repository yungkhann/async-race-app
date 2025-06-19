import { createSlice } from '@reduxjs/toolkit';
import type { Car } from '../../types/types';
import type { PayloadAction } from '@reduxjs/toolkit';
import { fetchCars } from './thunk';

interface GarageState {
  cars: Car[];
  selectedCar: Car | null;
  page: number;
  totalCount: number;
  carVelocities: { [id: number]: number };
  carRaceStatus: { [id: number]: boolean };
  carPositions: { [id: number]: number };
  raceStarted: boolean;
}

const initialState: GarageState = {
  cars: [],
  selectedCar: null,
  page: 1,
  totalCount: 0,
  carVelocities: {},
  carRaceStatus: {},
  carPositions: {},
  raceStarted: false,
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
    setCarVelocities(state, action: PayloadAction<{ [id: number]: number }>) {
      state.carVelocities = action.payload;
    },
    setCarRaceStatus(state, action: PayloadAction<{ [id: number]: boolean }>) {
      state.carRaceStatus = action.payload;
    },
    setCarPositions(state, action: PayloadAction<{ [id: number]: number }>) {
      state.carPositions = action.payload;
    },
    setRaceStarted(state, action: PayloadAction<boolean>) {
      state.raceStarted = action.payload;
    },
    resetRaceState(state) {
      state.carVelocities = {};
      state.carRaceStatus = {};
      state.carPositions = {};
      state.raceStarted = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchCars.fulfilled,
      (state, action: PayloadAction<{ cars: Car[]; totalCount: number }>) => {
        state.cars = action.payload.cars;
        state.totalCount = action.payload.totalCount;
      },
    );
  },
});

export const {
  setCars,
  setPage,
  setSelectedCar,
  setCarVelocities,
  setCarRaceStatus,
  setCarPositions,
  setRaceStarted,
  resetRaceState,
} = garageSlice.actions;

export default garageSlice.reducer;
