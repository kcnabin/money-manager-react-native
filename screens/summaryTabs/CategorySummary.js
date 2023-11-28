import { View, Text, ScrollView, StyleSheet, Alert } from "react-native";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
  fetchCategoryTransactionsFromDb,
  getCategoryTotalFromDb,
} from "../../util/database";

import DisplayLineChart from "./components/DisplayLineChart";
import DisplayTotal from "./components/DisplayTotal";
import AllTransactions from "../mainTransactionScreen/transactionScreen/dayScreen/AllTransactions";

import { displaySelectedMonthAndYear } from "../../helper/dateHelper";

import { allColors } from "../../Colors";

const CategorySummary = ({ route, navigation }) => {
  const { id, name, table } = route.params;
  const selectedMonth = useSelector((state) => state.selectedMonth);
  const transactionsCounter = useSelector((state) => state.transactionsCounter);

  const [transactions, setTransactions] = useState([]);
  const [total, setTotal] = useState(0);
  const [monthlyTotal, setMonthlyTotal] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle:
        `${name} for ${displaySelectedMonthAndYear(selectedMonth)}` ||
        "Category Summary",
    });
  }, [route.params]);

  useEffect(() => {
    const getCategoryTransactions = async () => {
      try {
        const data = await fetchCategoryTransactionsFromDb(
          table,
          id,
          selectedMonth
        );

        const totalAmount = data.reduce(
          (sum, eachTx) => sum + eachTx.amount,
          0
        );

        setTransactions(data);
        setTotal(totalAmount);
      } catch (error) {
        console.log(error);
        Alert.alert("Error fetching category transactions..");
      }
    };

    getCategoryTransactions();
  }, [route.params, selectedMonth]);

  useEffect(() => {
    let year = selectedMonth.year;
    let month = selectedMonth.month;

    const getTotal = async (year, month) => {
      try {
        const total = await getCategoryTotalFromDb(table, { year, month }, id);
        const totalWithMonth = {
          total,
          date: { year, month },
        };
        setMonthlyTotal((prevRecord) => [totalWithMonth, ...prevRecord]);
      } catch (error) {
        console.log(error);
        Alert.alert("Error fetching category total");
      }
    };

    for (let i = 0; i < 6; i++) {
      getTotal(year, month);

      month = month - 1;

      if (month === 0) {
        month = 12;
        year = year - 1;
      }
    }
  }, [selectedMonth, transactionsCounter]);

  if (transactions.length > 0 && monthlyTotal.length === 6) {
    return (
      <ScrollView style={style.container}>
        <View style={style.lineChart}>
          <DisplayLineChart data={monthlyTotal} />
        </View>
        <DisplayTotal total={total} />
        <AllTransactions transactions={transactions} />
      </ScrollView>
    );
  }

  return (
    <View style={style.container}>
      <Text>Fetching Category Transactions...</Text>
    </View>
  );
};

export default CategorySummary;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  lineChart: {
    borderColor: allColors.lightGray,
    borderWidth: 1,
    paddingTop: 12,
  },
});
