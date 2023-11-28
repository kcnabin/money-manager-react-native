import { View, Text, StyleSheet } from "react-native";
import { allColors } from "../../../../Colors";

const IncomeExpensesSummary = ({ income, expenses }) => {
  return (
    <View style={style.summaryContainer}>
      <View style={style.summary}>
        <Text style={style.summaryTitle}>Income</Text>
        <Text style={[style.summaryText, style.incomeTotal]}>
          {income.toLocaleString()}
        </Text>
      </View>
      <View style={style.summary}>
        <Text style={style.summaryTitle}>Expenses</Text>
        <Text style={[style.summaryText, style.expensesTotal]}>
          {expenses.toLocaleString()}
        </Text>
      </View>
      <View style={style.summary}>
        <Text style={style.summaryTitle}>Total</Text>
        <Text style={[style.summaryText]}>
          {(income - expenses).toLocaleString()}
        </Text>
      </View>
    </View>
  );
};

export default IncomeExpensesSummary;

const style = StyleSheet.create({
  summaryContainer: {
    flexDirection: "row",
  },
  summary: {
    flex: 1,
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: allColors.lightGray,
  },
  summaryTitle: {
    textAlign: "center",
    marginBottom: 4,
    fontSize: 16,
  },
  summaryText: {
    fontSize: 18,
    textAlign: "center",
  },
  incomeTotal: {
    color: allColors.incomeColor,
  },
  expensesTotal: {
    color: allColors.expensesColor,
  },
});
