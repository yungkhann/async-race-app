import { createAsyncThunk } from '@reduxjs/toolkit';

import type { Car } from '../../types/types';

export const fetchCars = createAsyncThunk(
  'garage/fetchCars',
  async (page: number) => {
    const res = await fetch(
      `http://localhost:3000/garage?_page=${page}&_limit=7`,
    );

    const totalCount = res.headers.get('X-Total-Count');
    const cars: Car[] = await res.json();

    return { cars, totalCount: Number(totalCount) };
  },
);
export const fetchAllCars = createAsyncThunk(
  'garage/fetchAllCars',
  async () => {
    const allCars = [];
    let page = 1;
    let limit = 7;
    while (true) {
      const res = await fetch(
        `http://localhost:3000/garage?_page=${page}&_limit=${limit}`,
      );
      const cars = await res.json();
      if (cars.length === 0) break;
      allCars.push(...cars);
      page++;
    }
    return allCars;
  },
);

export const createCar = createAsyncThunk(
  'garage/createCar',
  async ({ name, color }: { name: string; color: string }) => {
    const res = await fetch('http://localhost:3000/garage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, color }),
    });
    const car = await res.json();
    return car;
  },
);

export const updateCar = createAsyncThunk(
  'garage/updateCar',
  async ({ id, name, color }: { id: number; name: string; color: string }) => {
    const res = await fetch(`http://localhost:3000/garage/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, color }),
    });

    if (!res.ok) throw new Error('Failed to update car');

    const car = await res.json();
    return car;
  },
);

export const removeCar = createAsyncThunk(
  'garage/removeCar',
  async (id: number) => {
    const res = await fetch(`http://localhost:3000/garage/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete car');

    return id;
  },
);
