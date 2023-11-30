import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import AllDays from "./calendarScreen/AllDays";
import IncomeExpensesSummary from "./monthScreen/IncomeExpensesSummary";

const CalendarTab = () => {
  const monthlyIncome = useSelector((state) => state.income);
  const monthlyExpenses = useSelector((state) => state.expenses);

  const totalIncome = monthlyIncome.reduce(
    (sum, eachIncome) => sum + (eachIncome.amount || 0),
    0
  );
  const totalExpenses = monthlyExpenses.reduce(
    (sum, eachExpense) => sum + (eachExpense.amount || 0),
    0
  );

  let dayArray = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
  ];

  monthlyIncome.map((income) => {
    const day = new Date(income.date).getDate();
    dayArray[day - 1].push(income);
  });

  monthlyExpenses.map((expense) => {
    const expDay = new Date(expense.date).getDate();
    dayArray[expDay - 1].push(expense);
  });

  if (dayArray.length === 0) {
    return "";
  }

  return (
    <View style={style.container}>
      <IncomeExpensesSummary income={totalIncome} expenses={totalExpenses} />
      <AllDays dayArray={dayArray} />
    </View>
  );
};

export default CalendarTab;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
