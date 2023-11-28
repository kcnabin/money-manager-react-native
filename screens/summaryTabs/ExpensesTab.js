import { Alert, ScrollView, View, Text } from "react-native";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { getCategoryTotalFromDb } from "../../util/database";

import DisplayPieChart from "./components/DisplayPieChart";
import DisplayAllCategories from "./components/DisplayAllCategories";

import { PieChartColors } from "../../Colors";

const ExpensesTab = () => {
  const expensesCategory = useSelector((state) => state.expensesCategory);
  const selectedMonth = useSelector((state) => state.selectedMonth);
  const transactionsCounter = useSelector((state) => state.transactionsCounter);

  const [categoryAndTotal, setCategoryAndTotal] = useState([]);

  const getGrandTotal = (data) => {
    return data.reduce((sum, category) => sum + category.total, 0);
  };

  useEffect(() => {
    const getCatTotal = async () => {
      setCategoryAndTotal([]);
      try {
        expensesCategory.map(async (category, i) => {
          const total = await getCategoryTotalFromDb(
            "expenses",
            selectedMonth,
            category.id
          );

          const data = {
            name: category.value,
            total,
            color: PieChartColors[i],
            categoryId: category.id,
            table: "expenses",
          };

          setCategoryAndTotal((preValue) => [...preValue, data]);
        });
      } catch (error) {
        Alert.alert("Error fetching expenses category total...");
        console.log(error);
      }
    };

    getCatTotal();
  }, [expensesCategory, selectedMonth, transactionsCounter]);

  if (categoryAndTotal.length < expensesCategory.length) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <DisplayPieChart data={categoryAndTotal} />
      <DisplayAllCategories
        data={categoryAndTotal}
        grandTotal={getGrandTotal(categoryAndTotal)}
      />
    </ScrollView>
  );
};

export default ExpensesTab;
