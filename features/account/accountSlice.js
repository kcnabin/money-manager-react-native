import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: "default-account-id-cash",
    value: "Cash",
  },
  {
    id: "default-account-id-mobile-banking",
    value: "Mobile Banking",
  },
  {
    id: "default-account-id-credit-card",
    value: "Credit Card",
  },
  {
    id: "default-account-id-debit-card",
    value: "Debit Card",
  },
];

const accountSlice = createSlice({
  name: "accountSlice",
  initialState,
  reducers: {},
});

export default accountSlice.reducer;
