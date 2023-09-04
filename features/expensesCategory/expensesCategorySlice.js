import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: "default-expenses-id-food",
    value: "Food",
  },
  {
    id: "default-expenses-id-fuel",
    value: "Fuel",
  },
  {
    id: "default-expenses-id-rent",
    value: "Rent",
  },
  {
    id: "default-expenses-id-clothes",
    value: "Clothes",
  },
];

const expensesCategorySlice = createSlice({
  name: "expensesCategory",
  initialState,
  reducers: {
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
export const { editExpensesCategory } = expensesCategorySlice.actions;
