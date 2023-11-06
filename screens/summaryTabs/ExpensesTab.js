import { Alert, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { getCategoryTotalFromDb } from "../../util/database";

import DisplayPieChart from "./components/DisplayPieChart";
import DisplayAllCategories from "./components/DisplayAllCategories";

import AppLoading from "expo-app-loading";
import { PieChartColors } from "../../Colors";

const ExpensesTab = () => {
  const expensesCategory = useSelector((state) => state.expensesCategory);
  const selectedMonth = useSelector((state) => state.selectedMonth);

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
          };

          setCategoryAndTotal((preValue) => [...preValue, data]);
        });
      } catch (error) {
        Alert.alert("Error fetching expenses category total...");
        console.log(error);
      }
    };

    getCatTotal();
  }, [expensesCategory, selectedMonth]);

  if (categoryAndTotal.length < expensesCategory.length) {
    return <AppLoading />;
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
