import { Alert, View, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import IncomeExpensesSummary from "./monthScreen/IncomeExpensesSummary";
import AllTransactions from "./dayScreen/AllTransactions";

import {
  getAllMonthlyTransactionsFromDb,
  getMonthlyTotalFromDb,
} from "../../../util/database";
import { initExpensesFromDb } from "../../../features/expenses/expensesSlice";
import { initIncomeFromDb } from "../../../features/income/incomeSlice";

const DayTab = () => {
  const dispatch = useDispatch();
  const currentExpenses = useSelector((state) => state.expenses);
  const currentIncome = useSelector((state) => state.income);

  const selectedMonth = useSelector((state) => state.selectedMonth);

  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);

  useEffect(() => {
    const getTotal = async () => {
      try {
        const monthlyTotalIncome = await getMonthlyTotalFromDb(
          "income",
          selectedMonth
        );
        const monthlyTotalExpenses = await getMonthlyTotalFromDb(
          "expenses",
          selectedMonth
        );
        setTotalIncome(monthlyTotalIncome);
        setTotalExpenses(monthlyTotalExpenses);
      } catch (error) {}
    };

    getTotal();
  }, [currentIncome, currentExpenses, selectedMonth]);

  useEffect(() => {
    const getIncomeExpenses = async () => {
      try {
        const expenses = await getAllMonthlyTransactionsFromDb(
          "expenses",
          selectedMonth
        );
        const income = await getAllMonthlyTransactionsFromDb(
          "income",
          selectedMonth
        );

        dispatch(initExpensesFromDb(expenses));

        dispatch(initIncomeFromDb(income));
      } catch (error) {
        console.log(error);
        Alert.alert("Error fetching data...");
      }
    };

    getIncomeExpenses();
  }, [selectedMonth]);

  return (
    <View style={style.container}>
      <IncomeExpensesSummary income={totalIncome} expenses={totalExpenses} />

      <AllTransactions transactions={[...currentExpenses, ...currentIncome]} />
    </View>
  );
};

export default DayTab;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
