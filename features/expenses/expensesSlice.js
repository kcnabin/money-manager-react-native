import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const expensesSlice = createSlice({
  name: "expensesSlice",
  initialState,
  reducers: {
    initExpensesFromDb: (state, action) => {
      let expenses = [];

      for (eachExpense of action.payload) {
        const { id, type, account, category, date, amount, note } = eachExpense;

        if (
          !!id &&
          !!type &&
          !!account &&
          !!category &&
          !!date &&
          !!amount &&
          !!note
        ) {
          expenses = [
            ...expenses,
            { id, type, account, category, date, amount, note },
          ];
        }
      }

      return expenses;
    },

    addExpenses: (state, action) => {
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

    updateExpenses: (state, action) => {
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
        return state.map((expense) =>
          expense.id !== id
            ? expense
            : { id, type, account, category, date, amount, note }
        );
      }

      return state;
    },

    deleteExpenses: (state, action) => {
      const { id } = action.payload;

      if (!id) {
        return state;
      }

      return state.filter((expense) => expense.id !== id);
    },
  },
});

export default expensesSlice.reducer;
export const {
  addExpenses,
  updateExpenses,
  initExpensesFromDb,
  deleteExpenses,
} = expensesSlice.actions;
