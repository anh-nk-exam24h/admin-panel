import { createSlice } from '@reduxjs/toolkit';

export const testSlice = createSlice({
  name: 'test',
  initialState: {
    testEdit: {},
    listQuestion: [],
    condition: [],
    filter: {},
  },
  reducers: {
    updateTestEdit: (state, action) => {
      return { ...state, testEdit: action.payload };
    },
    clear: (state) => {
      return { ...state, testEdit: {}, condition: [] };
    },
    storeQuestion: (state, action) => {
      state.listQuestion = action.payload;
    },
    updateCondition: (state, action) => {
      return { ...state, condition: action.payload };
    },
    updateFilter: (state, action) => {
      return { ...state, filter: action.payload };
    },
  },
});

export const { updateTestEdit, clear, storeQuestion, updateCondition, updateFilter } =
  testSlice.actions;
