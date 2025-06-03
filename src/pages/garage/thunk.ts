import { createAsyncThunk } from '@reduxjs/toolkit';

import type { Car } from '../../types/types';

export const fetchCars = createAsyncThunk(
  'garage/fetchCars',
  async (page: number) => {
    const res = await fetch(
      `http://localhost:3000/garage?_page=${page}&_limit=7`,
    );

    const data: Car[] = await res.json();
    return data;
  },
);
