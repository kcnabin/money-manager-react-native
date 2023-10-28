import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const accountSlice = createSlice({
  name: "accountSlice",
  initialState,
  reducers: {
    initAccountFromDb: (state, action) => {
      let account = [];
      for (eachElement of action.payload) {
        const { id, value } = eachElement;

        if (!!id && !!value) {
          account = [...account, { id, value }];
        }
      }

      return account;
    },
    addAccount: (state, action) => {
      const { id, value } = action.payload;

      if (!!id && !!value) {
        return [...state, { id, value }];
      }
      return state;
    },
    updateAccount: (state, action) => {
      return state.map((account) =>
        account.id !== action.payload.id
          ? account
          : { id: action.payload.id, value: action.payload.value }
      );
    },
  },
});

export default accountSlice.reducer;
export const { initAccountFromDb, addAccount, updateAccount } =
  accountSlice.actions;
