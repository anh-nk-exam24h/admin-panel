import { createSlice } from '@reduxjs/toolkit';

export const ieltsSlice = createSlice({
  name: 'ielts',
  initialState: {
    filter: {},
  },
  reducers: {
    updateFilter: (state, action) => {
      return { ...state, filter: action.payload };
    },
  },
});

export const { updateFilter } = ieltsSlice.actions;
