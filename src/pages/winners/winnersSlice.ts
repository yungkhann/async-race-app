import { createSlice } from '@reduxjs/toolkit';

import type { Winner } from '../../types/types';

interface WinnersState {
  list: Winner[];
}

const initialState: WinnersState = {
  list: [],
};

const winnersSlice = createSlice({
  name: 'winners',
  initialState,
  reducers: {
    addWinner: (state, action) => {
      const existing = state.list.find((w) => w.id === action.payload.id);

      if (existing) {
        existing.wins += 1;
        if (action.payload.time < existing.time) {
          existing.time = action.payload.time;
        }
      } else {
        state.list.push({
          id: action.payload.id,
          name: action.payload.name,
          color: action.payload.color ?? '#000000',
          time: action.payload.time,
          wins: 1,
        });
      }
    },
    clearWinners: (state) => {
      state.list = [];
    },
  },
});

export const { addWinner, clearWinners } = winnersSlice.actions;
export default winnersSlice.reducer;
