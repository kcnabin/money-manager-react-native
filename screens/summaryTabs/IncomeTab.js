import { Alert, ScrollView, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { getCategoryTotalFromDb } from "../../util/database";
import DisplayAllCategories from "./components/DisplayAllCategories";
import DisplayPieChart from "./components/DisplayPieChart";

import AppLoading from "expo-app-loading";
import { PieChartColors } from "../../Colors";

const IncomeTab = () => {
  const incomeCategory = useSelector((state) => state.incomeCategory);
  const selectedMonth = useSelector((state) => state.selectedMonth);

  const [categoryAndTotal, setCategoryAndTotal] = useState([]);

  const getGrandTotal = (data) => {
    return data.reduce((sum, category) => sum + category.total, 0);
  };

  useEffect(() => {
    const getCatTotal = async () => {
      setCategoryAndTotal([]);
      try {
        incomeCategory.map(async (category, i) => {
          const total = await getCategoryTotalFromDb(
            "income",
            selectedMonth,
            category.id
          );

          const data = {
            name: category.value,
            total,
            color: PieChartColors[i],
          };

          setCategoryAndTotal((prevValue) => [...prevValue, data]);
        });
      } catch (error) {
        Alert.alert("Error fetching category total...");
        console.log(error);
      }
    };

    getCatTotal();
  }, [selectedMonth, incomeCategory]);

  if (categoryAndTotal.length < incomeCategory.length) {
    return "";
    // return <AppLoading />;
  }

  return (
    <ScrollView style={style.container}>
      <DisplayPieChart data={categoryAndTotal} />
      <DisplayAllCategories
        data={categoryAndTotal}
        grandTotal={getGrandTotal(categoryAndTotal)}
      />
    </ScrollView>
  );
};

export default IncomeTab;

const style = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
});
