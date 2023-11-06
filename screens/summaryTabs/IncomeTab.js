import { View, Text, Alert } from "react-native";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { getCategoryTotalFromDb } from "../../util/database";

import { mainStyle } from "../../mainStyle";

const IncomeTab = () => {
  const incomeCategory = useSelector((state) => state.incomeCategory);
  const selectedMonth = useSelector((state) => state.selectedMonth);

  const [categoryAndTotal, setCategoryAndTotal] = useState([]);

  useEffect(() => {
    const getCatTotal = async () => {
      try {
        incomeCategory.map(async (category) => {
          const total = await getCategoryTotalFromDb(
            "income",
            selectedMonth,
            category.id
          );

          const data = {
            name: category.value,
            id: category.id,
            total: total,
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

  return (
    <View style={mainStyle.fullArea}>
      <Text style={mainStyle.bigFont}>IncomeTab</Text>
    </View>
  );
};

export default IncomeTab;
