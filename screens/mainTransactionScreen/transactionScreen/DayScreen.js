import { View } from "react-native";
import { useSelector } from "react-redux";

import DailySummary from "./dayScreen/DailySummary";
import AllTransactions from "./dayScreen/AllTransactions";

import { getTotalFromTransactions } from "../../../helper/getTotalFromTransactions";
import { getCurrentMonthTransactions } from "../../../helper/getCurrentMonthTransactions";

import { mainStyle } from "../../../mainStyle";

const DayTab = () => {
  const selectedMonth = useSelector((state) => state.selectedMonth);

  const allExpenses = useSelector((state) => state.expenses);
  const currentMonthExpenses = getCurrentMonthTransactions(
    allExpenses,
    selectedMonth
  );
  const dailyExpenses = getTotalFromTransactions(currentMonthExpenses);

  const allIncome = useSelector((state) => state.income);
  const currentMonthIncome = getCurrentMonthTransactions(
    allIncome,
    selectedMonth
  );
  const dailyIncome = getTotalFromTransactions(currentMonthIncome);

  const dailyTotal = dailyIncome - dailyExpenses;

  return (
    <View style={mainStyle.fullArea}>
      <DailySummary
        dailyIncome={dailyIncome}
        dailyExpenses={dailyExpenses}
        dailyTotal={dailyTotal}
      />

      <AllTransactions
        transactions={[...currentMonthExpenses, ...currentMonthIncome]}
      />
    </View>
  );
};

export default DayTab;
