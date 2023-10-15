import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const expensesSlice = createSlice({
  name: "expensesSlice",
  initialState,
  reducers: {
    addExpenses: (state, action) => {
      return [...state, action.payload];
    },
    updateExpenses: (state, action) => {
      return state.map((expense) => {
        if (expense.id !== action.payload.id) {
          return expense;
        }
        return {
          ...expense,
          ...action.payload.updatedObject,
        };
      });
    },
    initExpensesFromDb: (state, action) => {
      return action.payload;
    },
    deleteExpenses: (state, action) => {
      return state.filter((expense) => expense.id !== action.payload.id);
    },
  },
});

export default expensesSlice.reducer;
export const {
  addExpenses,
  updateExpenses,
  initExpensesFromDb,
  deleteExpenses,
} = expensesSlice.actions;
