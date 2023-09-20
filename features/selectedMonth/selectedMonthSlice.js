import { createSlice } from "@reduxjs/toolkit";

const getInitialState = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();

  return {
    year,
    month,
  };
};

const selectedMonthSlice = createSlice({
  name: "selectedMonth",
  initialState: getInitialState(),
  reducers: {
    decreaseOneMonth: (state) => {
      if (state.month !== 0) {
        return {
          year: state.year,
          month: state.month - 1,
        };
      }
      return {
        year: state.year - 1,
        month: 11,
      };
    },
    increaseOneMonth: (state) => {
      if (state.month !== 11) {
        return {
          year: state.year,
          month: state.month + 1,
        };
      }
      return {
        year: state.year + 1,
        month: 0,
      };
    },
  },
});

export default selectedMonthSlice.reducer;
export const { decreaseOneMonth, increaseOneMonth } =
  selectedMonthSlice.actions;
