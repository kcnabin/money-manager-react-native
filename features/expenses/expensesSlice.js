import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    account: "default-account-id-debit-card",
    amount: "300",
    category: "default-expenses-id-food",
    date: "Mon Sep 11 2023 18:40:52 GMT+0545",
    note: "Dairy Milk",
    type: "expenses",
    id: "default-expenses-id-0",
  },
  {
    account: "default-account-id-credit-card",
    amount: "1000",
    category: "default-expenses-id-fuel",
    date: "Mon Sep 12 2023 18:41:31 GMT+0545",
    note: "Petrol",
    type: "expenses",
    id: "default-expenses-id-1",
  },
  {
    account: "default-account-id-credit-card",
    amount: "1000",
    category: "default-expenses-id-fuel",
    date: "Mon Jun 11 2023 18:41:31 GMT+0545",
    note: "Petrol",
    type: "expenses",
    id: "default-expenses-id-2",
  },
];

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
  },
});

export default expensesSlice.reducer;
export const { addExpenses, updateExpenses } = expensesSlice.actions;
