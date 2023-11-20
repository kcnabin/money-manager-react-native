import { View, StyleSheet } from "react-native";

import { useSelector } from "react-redux";

import AllDays from "./calendarScreen/AllDays";
import DailySummary from "./dayScreen/DailySummary";

const CalendarTab = () => {
  const monthlyIncome = useSelector((state) => state.income);
  const monthlyExpenses = useSelector((state) => state.expenses);
  const selectedMonth = useSelector((state) => state.selectedMonth);

  const totalIncome = monthlyIncome.reduce(
    (sum, eachIncome) => sum + (eachIncome.amount || 0),
    0
  );
  const totalExpenses = monthlyExpenses.reduce(
    (sum, eachExpense) => sum + (eachExpense.amount || 0),
    0
  );

  const totalDaysInSelectedMonth = new Date(
    `${selectedMonth.year}`,
    `${selectedMonth.month}`,
    0
  ).getDate();

  const dayArray = [];
  for (let i = 0; i < totalDaysInSelectedMonth; i++) {
    dayArray.push([]);
  }

  monthlyIncome.forEach((income) => {
    const day = new Date(income.date).getDate();
    dayArray[day - 1].push(income);
  });

  monthlyExpenses.forEach((expense) => {
    const day = new Date(expense.date).getDate();
    dayArray[day - 1].push(expense);
  });

  return (
    <View style={style.container}>
      <DailySummary totalIncome={totalIncome} totalExpenses={totalExpenses} />
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
