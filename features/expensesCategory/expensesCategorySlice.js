import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  // {
  //   id: "default-expenses-id-food",
  //   value: "Food",
  // }
];

const expensesCategorySlice = createSlice({
  name: "expensesCategory",
  initialState,
  reducers: {
    initExpensesCategoryFromDb: (state, action) => {
      let category = [];

      for (eachElement of action.payload) {
        const { id, value } = eachElement;

        if (!!id && !!value) {
          category = [...category, { id, value }];
        }
      }
      return category;
    },
    addExpensesCategory: (state, action) => {
      const { id, value } = action.payload;

      if (!!id && !!value) {
        return [...state, { id, value }];
      }
      return state;
    },
    updateExpensesCategory: (state, action) => {
      const { id, value } = action.payload;

      if (!!id && !!value) {
        return state.map((expensesCategory) =>
          expensesCategory.id !== id ? expensesCategory : { id, value }
        );
      }

      return state;
    },
    deleteExpensesCategory: (state, action) => {
      const { id } = action.payload;

      if (id) {
        return state.map((expensesCategory) => expensesCategory.id !== id);
      }

      return state;
    },
  },
});

export default expensesCategorySlice.reducer;
export const {
  initExpensesCategoryFromDb,
  addExpensesCategory,
  updateExpensesCategory,
  deleteExpensesCategory,
} = expensesCategorySlice.actions;
