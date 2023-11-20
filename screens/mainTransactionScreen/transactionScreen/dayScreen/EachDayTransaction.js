import { View, Text, StyleSheet } from "react-native";
import EachTransaction from "./EachTransaction";

import { getTotalFromTransactions } from "../../../../helper/getTotalFromTransactions";
import { mainStyle } from "../../../../mainStyle";
import { allColors } from "../../../../Colors";

const EachDayTransaction = ({ transactions }) => {
  const eachDayIncome = transactions?.filter(
    (eachTransaction) => eachTransaction.type === "income"
  );

  const eachDayExpenses = transactions?.filter(
    (eachTransaction) => eachTransaction.type === "expenses"
  );

  const totalIncome = getTotalFromTransactions(eachDayIncome);
  const totalExpenses = getTotalFromTransactions(eachDayExpenses);

  return (
    <View style={style.dayContainer}>
      <View style={style.daySummary}>
        <Text>{new Date(transactions[0]?.date).toDateString()}</Text>

        <Text style={mainStyle.incomeColor}>
          {" "}
          {Number(totalIncome).toLocaleString()}
        </Text>

        <Text style={mainStyle.expensesColor}>
          {Number(totalExpenses).toLocaleString()}
        </Text>
      </View>

      {transactions.map((eachTransaction, i) => (
        <EachTransaction key={i} transaction={eachTransaction} />
      ))}
    </View>
  );
};

export default EachDayTransaction;

const style = StyleSheet.create({
  dayContainer: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "white",
    borderBlockColor: allColors.lightGray,
    borderBottomWidth: 2,
  },
  daySummary: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
