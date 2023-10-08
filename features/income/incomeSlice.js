import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  // {
  //   account: "default-account-id-cash",
  //   amount: "1500",
  //   category: "default-income-id-allowances",
  //   date: "Mon Sep 11 2023 18:38:25 GMT+0545",
  //   note: "Mobil A/W",
  //   type: "income",
  //   id: "default-income-id-0",
  // },
  // {
  //   account: "default-account-id-mobile-banking",
  //   amount: "400",
  //   category: "default-income-id-bonus",
  //   date: "Mon Sep 11 2023 18:40:04 GMT+0545",
  //   note: "Festival",
  //   type: "income",
  //   id: "default-income-id-1",
  // },
];

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
  },
});

export default incomeSlice.reducer;
export const { addIncome, updateIncome } = incomeSlice.actions;
