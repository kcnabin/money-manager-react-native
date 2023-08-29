import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: "0",
    value: "Salary",
  },
  {
    id: "1",
    value: "Allowances",
  },
  {
    id: "2",
    value: "Others",
  },
  {
    id: "3",
    value: "Bonus",
  },
];

const incomeCategorySlice = createSlice({
  name: "incomeCategory",
  initialState,
  reducers: {},
});

export default incomeCategorySlice.reducer;
