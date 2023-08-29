import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const expensesSlice = createSlice({
  name: "expensesSlice",
  initialState,
  reducers: {
    addExpenses: (state, action) => {
      return [...state, action.payload];
    },
  },
});

export default expensesSlice.reducer;
export const { addExpenses } = expensesSlice.actions;
