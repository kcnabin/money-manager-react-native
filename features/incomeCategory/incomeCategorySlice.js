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
export const {
  initIncomeCategoryFromDb,
  addIncomeCategory,
  editIncomeCategory,
} = incomeCategorySlice.actions;
