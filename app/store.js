import { configureStore } from "@reduxjs/toolkit";
import incomeCategoryReducer from "../features/incomeCategory/incomeCategorySlice";
import expensesCategoryReducer from "../features/expensesCategory/expensesCategorySlice";
import accountReducer from "../features/account/accountSlice";
import incomeReducer from "../features/income/incomeSlice";
import expensesReducer from "../features/expenses/expensesSlice";
import selectedMonthReducer from "../features/selectedMonth/selectedMonthSlice";
import transactionsCounterReducer from "../features/transactionsCounter/transactionsCounterSlice";

export const store = configureStore({
  reducer: {
    incomeCategory: incomeCategoryReducer,
    expensesCategory: expensesCategoryReducer,
    account: accountReducer,
    income: incomeReducer,
    expenses: expensesReducer,
    selectedMonth: selectedMonthReducer,
    transactionsCounter: transactionsCounterReducer,
  },
});
