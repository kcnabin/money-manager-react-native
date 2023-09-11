import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    account: "default-account-id-debit-card",
    amount: "300",
    category: "default-expenses-id-food",
    date: "Mon Sep 11 2023 18:40:52 GMT+0545",
    note: "Dairy Milk",
    type: "expenses",
  },
  {
    account: "default-account-id-credit-card",
    amount: "1000",
    category: "default-expenses-id-fuel",
    date: "Mon Sep 12 2023 18:41:31 GMT+0545",
    note: "Petrol",
    type: "expenses",
  },
  {
    account: "default-account-id-credit-card",
    amount: "1000",
    category: "default-expenses-id-fuel",
    date: "Mon Jun 11 2023 18:41:31 GMT+0545",
    note: "Petrol",
    type: "expenses",
  },
];

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
