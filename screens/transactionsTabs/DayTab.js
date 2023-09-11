import { View } from "react-native";
import { mainStyle } from "../../mainStyle";
import DailySummary from "./dayTabComponents/DailySummary";
import { useSelector } from "react-redux";
import { getTotalFromTransactions } from "../../helper/getTotalFromTransactions";
import { getCurrentMonthTransactions } from "../../helper/getCurrentMonthTransactions";
import AllTransactions from "./dayTabComponents/AllTransactions";

const DayTab = () => {
  const allExpenses = useSelector((state) => state.expenses);
  const currentMonthExpenses = getCurrentMonthTransactions(allExpenses);
  const dailyExpenses = getTotalFromTransactions(currentMonthExpenses);

  const allIncome = useSelector((state) => state.income);
  const currentMonthIncome = getCurrentMonthTransactions(allIncome);
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
