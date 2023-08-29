import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const incomeSlice = createSlice({
  name: "incomeSlice",
  initialState,
  reducers: {
    addIncome: (state, action) => {
      return [...state, action.payload];
    },
  },
});

export default incomeSlice.reducer;
export const { addIncome } = incomeSlice.actions;
