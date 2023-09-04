import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: "default-income-id-salary",
    value: "Salary",
  },
  {
    id: "default-income-id-allowances",
    value: "Allowances",
  },
  {
    id: "default-income-id-others",
    value: "Others",
  },
  {
    id: "default-income-id-bonus",
    value: "Bonus",
  },
];

const incomeCategorySlice = createSlice({
  name: "incomeCategory",
  initialState,
  reducers: {
    editIncomeCategory: (state, action) => {
      return state.map((incomeCategory) =>
        incomeCategory.id !== action.payload.id
          ? incomeCategory
          : { id: action.payload.id, value: action.payload.newValue }
      );
    },
  },
});

export default incomeCategorySlice.reducer;
export const { editIncomeCategory } = incomeCategorySlice.actions;
