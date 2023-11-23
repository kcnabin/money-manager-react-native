import { createSlice } from "@reduxjs/toolkit";

const transactionCounterSlice = createSlice({
  name: "transactionCounter",
  initialState: 0,
  reducers: {
    // state is increase by 1 each time transaction is added, updated or deleted
    transactionConducted: (state, action) => {
      return state + 1;
    },
  },
});

export default transactionCounterSlice.reducer;

export const { transactionConducted } = transactionCounterSlice.actions;
