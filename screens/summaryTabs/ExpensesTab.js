import { View, Text, Alert } from "react-native";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { getCategoryTotalFromDb } from "../../util/database";

import { mainStyle } from "../../mainStyle";

const ExpensesTab = () => {
  const expensesCategory = useSelector((state) => state.expensesCategory);
  const selectedMonth = useSelector((state) => state.selectedMonth);

  const [categoryAndTotal, setCategoryAndTotal] = useState([]);

  useEffect(() => {
    const getCatTotal = async () => {
      try {
        expensesCategory.map(async (category) => {
          const total = await getCategoryTotalFromDb(
            "expenses",
            selectedMonth,
            category.id
          );

          const data = {
            name: category.value,
            id: category.id,
            total,
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

  return (
    <View style={mainStyle.fullArea}>
      <Text style={mainStyle.bigFont}>ExpensesTab</Text>
    </View>
  );
};

export default ExpensesTab;
