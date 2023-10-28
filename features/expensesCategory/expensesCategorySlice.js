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
    editExpensesCategory: (state, action) => {
      return state.map((expensesCategory) =>
        expensesCategory.id !== action.payload.id
          ? expensesCategory
          : {
              id: action.payload.id,
              value: action.payload.newValue,
            }
      );
    },
  },
});

export default expensesCategorySlice.reducer;
export const {
  initExpensesCategoryFromDb,
  addExpensesCategory,
  editExpensesCategory,
} = expensesCategorySlice.actions;
