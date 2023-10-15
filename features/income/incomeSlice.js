import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const incomeSlice = createSlice({
  name: "incomeSlice",
  initialState,
  reducers: {
    addIncome: (state, action) => {
      return [...state, action.payload];
    },
    updateIncome: (state, action) => {
      return state.map((income) => {
        if (income.id !== action.payload.id) {
          return income;
        }
        return {
          ...income,
          ...action.payload.updatedObject,
        };
      });
    },
    initIncomeFromDb: (state, action) => {
      return action.payload;
    },
    deleteIncome: (state, action) => {
      return state.filter((income) => income.id !== action.payload.id);
    },
  },
});

export default incomeSlice.reducer;
export const { addIncome, updateIncome, initIncomeFromDb, deleteIncome } =
  incomeSlice.actions;
