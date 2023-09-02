import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: "default-income-id-salary",
    value: "Salary",
  },
  {
    id: "default-income-id-allowances",
    value: "Allowances",
  },
  {
    id: "default-income-id-others",
    value: "Others",
  },
  {
    id: "default-income-id-bonus",
    value: "Bonus",
  },
];

const incomeCategorySlice = createSlice({
  name: "incomeCategory",
  initialState,
  reducers: {},
});

export default incomeCategorySlice.reducer;
