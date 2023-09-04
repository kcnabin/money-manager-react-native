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
  reducers: {
    editAccount: (state, action) => {
      return state.map((account) =>
        account.id !== action.payload.id
          ? account
          : { id: action.payload.id, value: action.payload.newValue }
      );
    },
  },
});

export default accountSlice.reducer;
export const { editAccount } = accountSlice.actions;
