import { areMonthsEqual, getMonth } from "./dateHelper";

export const getCurrentMonthTransactions = (
  transactions,
  currentMonth = getMonth()
) => {
  return transactions.filter((eachTransaction) => {
    const transactionMonth = getMonth(new Date(eachTransaction.date));
    return areMonthsEqual(transactionMonth, currentMonth);
  });
};
