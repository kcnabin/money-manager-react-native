import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  // {
  //   id: "default-income-id-salary",
  //   value: "Salary",
  // },
];

const incomeCategorySlice = createSlice({
  name: "incomeCategory",
  initialState,
  reducers: {
    initIncomeCategoryFromDb: (state, action) => {
      let category = [];

      for (eachElement of action.payload) {
        const { id, value } = eachElement;

        if (!!id && !!value) {
          category = [...category, { id, value }];
        }
      }

      return category;
    },
    addIncomeCategory: (state, action) => {
      const { id, value } = action.payload;

      if (!!id && !!value) {
        return [...state, { id, value }];
      }

      return state;
    },
    updateIncomeCategory: (state, action) => {
      const { id, value } = action.payload;

      if (!!id && !!value) {
        return state.map((incomeCategory) =>
          incomeCategory.id !== id ? incomeCategory : { id, value }
        );
      }

      return state;
    },
    deleteIncomeCategory: (state, action) => {
      const { id } = action.payload;

      if (id) {
        return state.filter((incomeCategory) => incomeCategory.id !== id);
      }

      return state;
    },
  },
});

export default incomeCategorySlice.reducer;
export const {
  initIncomeCategoryFromDb,
  addIncomeCategory,
  updateIncomeCategory,
  deleteIncomeCategory,
} = incomeCategorySlice.actions;
