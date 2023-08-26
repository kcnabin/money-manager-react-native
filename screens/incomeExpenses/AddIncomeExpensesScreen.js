import { useEffect } from "react";
import { View, Text } from "react-native";
import { mainStyle } from "../../mainStyle";
import { useNavigation } from "@react-navigation/native";

const AddIncomeExpensesScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      title: "Income or Expense?",
    });
  }, []);

  return (
    <View style={mainStyle.fullArea}>
      <Text style={[mainStyle.bigFont, mainStyle.headerText]}>
        AddIncomeExpensesScreen
      </Text>
    </View>
  );
};

export default AddIncomeExpensesScreen;
