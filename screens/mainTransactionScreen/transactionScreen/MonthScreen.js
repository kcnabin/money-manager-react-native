import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { getMonthlyTotalFromDb } from "../../../util/database";

import { allColors } from "../../../Colors";
import { displaySelectedMonthAndYear } from "../../../helper/dateHelper";

import IncomeExpensesSummary from "./monthScreen/IncomeExpensesSummary";

const MonthTab = () => {
  const transactionsCounter = useSelector((state) => state.transactionsCounter);
  const selectedMonth = useSelector((state) => state.selectedMonth);
  const [monthlyRecord, setMonthlyRecord] = useState([]);

  useEffect(() => {
    setMonthlyRecord([]);
    let year = selectedMonth.year;
    let month = selectedMonth.month;

    const getTotal = async (year, month) => {
      const income = await getMonthlyTotalFromDb("income", { year, month });
      const expenses = await getMonthlyTotalFromDb("expenses", { year, month });

      const monthlyIncomeExpenses = {
        income,
        expenses,
        year,
        month,
      };
      setMonthlyRecord((prevRecord) => [...prevRecord, monthlyIncomeExpenses]);
    };

    for (let i = 0; i < 12; i++) {
      getTotal(year, month);

      month = month - 1;

      if (month === 0) {
        month = 12;
        year = year - 1;
      }
    }
  }, [selectedMonth, transactionsCounter]);

  let totalIncome = 0;
  let totalExpenses = 0;

  if (monthlyRecord.length === 12) {
    totalIncome = monthlyRecord.reduce((sum, record) => sum + record.income, 0);

    totalExpenses = monthlyRecord.reduce(
      (sum, record) => sum + record.expenses,
      0
    );
  }

  if (monthlyRecord.length < 12) {
    // return <AppLoading />;
    return "";
  }

  return (
    <ScrollView style={style.container}>
      <IncomeExpensesSummary income={totalIncome} expenses={totalExpenses} />

      <View style={style.monthlyRecordsContainer}>
        {monthlyRecord.map((eachRecord, i) => (
          <View key={i} style={style.eachMonth}>
            <View style={style.eachValue}>
              <Text style={[style.text, style.dateText]}>
                {displaySelectedMonthAndYear({
                  month: eachRecord.month,
                  year: eachRecord.year,
                })}
              </Text>
            </View>
            <View style={style.eachValue}>
              <Text style={[style.text, style.incomeText]}>
                {eachRecord.income.toLocaleString()}
              </Text>
            </View>
            <View style={style.eachValue}>
              <Text style={[style.text, style.expensesText]}>
                {eachRecord.expenses.toLocaleString()}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default MonthTab;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  monthlyRecordsContainer: {
    marginBottom: 12,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  font24: {
    fontSize: 24,
  },
  eachMonth: {
    flexDirection: "row",
    borderBottomColor: allColors.lightGray,
    borderBottomWidth: 1,
    paddingHorizontal: 24,
  },
  eachValue: {
    flex: 1,
    paddingVertical: 12,
  },
  text: {
    fontSize: 16,
  },
  dateText: {
    fontWeight: "bold",
  },
  incomeText: {
    color: allColors.incomeColor,
    textAlign: "right",
  },
  expensesText: {
    color: allColors.expensesColor,
    textAlign: "right",
  },
});
