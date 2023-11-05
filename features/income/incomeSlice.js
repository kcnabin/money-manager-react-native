import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const incomeSlice = createSlice({
  name: "incomeSlice",
  initialState,
  reducers: {
    initIncomeFromDb: (state, action) => {
      let income = [];

      for (eachIncome of action.payload) {
        const { id, type, account, category, date, amount, note } = eachIncome;

        if (
          !!id &&
          !!type &&
          !!account &&
          !!category &&
          !!date &&
          !!amount &&
          !!note
        ) {
          income = [
            ...income,
            { id, type, account, category, date, amount, note },
          ];
        }
      }

      return income;
    },

    addIncome: (state, action) => {
      const { id, type, account, category, date, amount, note } =
        action.payload;

      if (
        !!id &&
        !!type &&
        !!account &&
        !!category &&
        !!date &&
        !!amount &&
        !!note
      ) {
        return [...state, { id, type, account, category, date, amount, note }];
      }

      return state;
    },

    updateIncome: (state, action) => {
      const { id, updatedObject } = action.payload;

      if (!id || !updatedObject) {
        return state;
      }

      const { type, account, category, date, amount, note } = updatedObject;

      if (
        !!id &&
        !!type &&
        !!account &&
        !!category &&
        !!date &&
        !!amount &&
        !!note
      ) {
        return state.map((income) =>
          income.id !== id
            ? income
            : { id, type, account, category, date, amount, note }
        );
      }
      return state;
    },

    deleteIncome: (state, action) => {
      const { id } = action.payload;

      if (!id) {
        return state;
      }

      return state.filter((income) => income.id !== id);
    },
  },
});

export default incomeSlice.reducer;
export const { addIncome, updateIncome, initIncomeFromDb, deleteIncome } =
  incomeSlice.actions;
