import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: "0",
    value: "Cash",
  },
  {
    id: "1",
    value: "Mobile Banking",
  },
  {
    id: "2",
    value: "Credit Card",
  },
  {
    id: "3",
    value: "Debit Card",
  },
];

const accountSlice = createSlice({
  name: "accountSlice",
  initialState,
  reducers: {},
});

export default accountSlice.reducer;
