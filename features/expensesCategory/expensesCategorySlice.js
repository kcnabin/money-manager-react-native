import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: "0",
    value: "Food",
  },
  {
    id: "1",
    value: "Fuel",
  },
  {
    id: "2",
    value: "Rent",
  },
  {
    id: "3",
    value: "Clothes",
  },
];

const expensesCategorySlice = createSlice({
  name: "expensesCategory",
  initialState,
  reducers: {},
});

export default expensesCategorySlice.reducer;
