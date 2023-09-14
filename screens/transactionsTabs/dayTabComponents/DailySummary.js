import { View, Text, StyleSheet } from "react-native";
import { mainStyle } from "../../../mainStyle";
import { allColors } from "../../../Colors";

const DailySummary = ({ dailyIncome, dailyExpenses, dailyTotal }) => {
  return (
    <View style={style.dailySummary}>
      <View style={style.eachTransaction}>
        <Text style={style.eachTransactionTitle}>Income</Text>
        <Text style={[style.eachTransactionValue, mainStyle.incomeColor]}>
          {dailyIncome.toLocaleString()}
        </Text>
      </View>

      <View style={style.eachTransaction}>
        <Text style={style.eachTransactionTitle}>Expenses</Text>
        <Text style={[style.eachTransactionValue, mainStyle.expensesColor]}>
          {dailyExpenses.toLocaleString()}
        </Text>
      </View>

      <View style={style.eachTransaction}>
        <Text style={style.eachTransactionTitle}>Total</Text>
        <Text style={[style.eachTransactionValue]}>
          {dailyTotal.toLocaleString()}
        </Text>
      </View>
    </View>
  );
};

export default DailySummary;

const style = StyleSheet.create({
  dailySummary: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomWidth: 1,
    borderBottomColor: allColors.gray,
  },
  eachTransaction: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  eachTransactionTitle: {
    fontSize: 16,
    textAlign: "center",
  },
  eachTransactionValue: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
