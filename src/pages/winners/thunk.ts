import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Winner } from '../../types/types';
import { generateRandomCar } from '../../utils/carGenerator';
export const fetchWinners = createAsyncThunk<Winner[]>(
  'garage/fetchWinners',
  async () => {
    const res = await fetch('http://localhost:3000/winners');
    const winners = await res.json();
    return winners;
  },
);

export const generateCars = createAsyncThunk(
  'garage/generateCars',
  async () => {
    const cars = Array.from({ length: 7 }, generateRandomCar);

    await Promise.all(
      cars.map((car) =>
        fetch('http://localhost:3000/garage', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(car),
        }),
      ),
    );
  },
);
