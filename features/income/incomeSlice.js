import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    account: "default-account-id-cash",
    amount: "1500",
    category: "default-income-id-allowances",
    date: "Mon Sep 11 2023 18:38:25 GMT+0545",
    note: "Mobil A/W",
    type: "income",
  },
  {
    account: "default-account-id-mobile-banking",
    amount: "400",
    category: "default-income-id-bonus",
    date: "Mon Sep 11 2023 18:40:04 GMT+0545",
    note: "Festival",
    type: "income",
  },
];

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
